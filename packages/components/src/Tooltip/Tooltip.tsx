import {
    Placement,
    arrow,
    autoUpdate,
    flip,
    offset,
    shift,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
    useRole,
} from '@floating-ui/react'
import classNames from 'clsx'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cloneElement, useEffect, useMemo, useRef, useState } from 'react'

export interface TooltipProps {
    label: string | JSX.Element
    placement?: Placement
    children: JSX.Element
    className?: string
}

export const Tooltip = ({
    children,
    label,
    placement = 'bottom',
    className,
}: TooltipProps) => {
    const [open, setOpen] = useState(false)
    const arrowRef = useRef<HTMLDivElement | null>(null)
    const prefersReducedMotion = useReducedMotion()

    const {
        x,
        y,
        strategy,
        context,
        refs,
        update,
        middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    } = useFloating({
        placement,
        open,
        onOpenChange: setOpen,
        middleware: [
            offset(5),
            flip(),
            shift({ padding: 8 }),
            arrow({ element: arrowRef }),
        ],
    })

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useHover(context, { delay: { open: 1000 }, restMs: 40 }),
        useFocus(context),
        useRole(context, { role: 'tooltip' }),
        useDismiss(context),
    ])

    useEffect(() => {
        if (refs.reference.current && refs.floating.current && open) {
            // Sync repositions to rAF for smoother animations
            return autoUpdate(
                refs.reference.current,
                refs.floating.current,
                update,
                {
                    animationFrame: true,
                }
            )
        }
    }, [refs.reference, refs.floating, update, open])

    const side = placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left'
    const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
    }[side]

    // Transform origin improves perceived smoothness
    const transformOrigin = useMemo(() => {
        switch (side) {
            case 'top':
                return 'bottom center'
            case 'bottom':
                return 'top center'
            case 'left':
                return 'center right'
            case 'right':
                return 'center left'
            default:
                return 'top center'
        }
    }, [side])

    // Motion variants: light spring for snappy but smooth feel
    const variants = useMemo(
        () => ({
            hidden: { opacity: 0, scale: 0.96 },
            shown: {
                opacity: 1,
                scale: 1,
                transition: prefersReducedMotion
                    ? { duration: 0.12 }
                    : {
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                          mass: 0.2,
                      },
            },
            exit: {
                opacity: 0,
                scale: 0.98,
                transition: { duration: 0.12 },
            },
        }),
        [prefersReducedMotion]
    )

    return (
        <>
            {cloneElement(
                children,
                getReferenceProps({ ref: refs.setReference, ...children.props })
            )}

            <AnimatePresence>
                {open && (
                    <motion.div
                        data-testid="tooltip"
                        key="tooltip"
                        initial="hidden"
                        animate="shown"
                        exit="exit"
                        variants={variants}
                        {...getFloatingProps({
                            ref: refs.setFloating,
                            className: classNames(
                                'pointer-events-none px-3 rounded max-w-[300px] text-pzh-white font-normal leading-5 transform-gpu',
                                className
                            ),
                            style: {
                                position: strategy,
                                top: y ?? 0,
                                left: x ?? 0,
                                paddingTop: 8,
                                paddingBottom: 8,
                                fontFamily: 'Karbon Regular',
                                background: '#333333',
                                transformOrigin,
                                willChange: 'transform, opacity',
                            },
                        })}>
                        {typeof label === 'string' ? (
                            <div dangerouslySetInnerHTML={{ __html: label }} />
                        ) : (
                            label
                        )}

                        <div
                            ref={arrowRef}
                            className="absolute h-2 w-2 rotate-45 overflow-hidden bg-[#333333]"
                            style={
                                (staticSide && {
                                    left: arrowX != null ? `${arrowX}px` : '',
                                    top: arrowY != null ? `${arrowY}px` : '',
                                    [staticSide]: '-4px',
                                }) ||
                                undefined
                            }
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
