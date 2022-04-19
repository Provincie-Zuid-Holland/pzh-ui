import {
    cloneElement,
    CSSProperties,
    forwardRef,
    useEffect,
    useRef,
    useState,
} from 'react'
import {
    arrow,
    Placement,
    offset,
    flip,
    shift,
    autoUpdate,
    useFloating,
    useInteractions,
    useHover,
    useFocus,
    useRole,
    useDismiss,
} from '@floating-ui/react-dom-interactions'
import { motion, AnimatePresence } from 'framer-motion'

export interface TooltipProps {
    label: string
    placement?: Placement
    children: JSX.Element
}

export const Tooltip = forwardRef(
    ({ children, label, placement = 'bottom' }: TooltipProps) => {
        const [open, setOpen] = useState(false)

        const arrowRef = useRef(null)

        const {
            x,
            y,
            reference,
            floating,
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
            useHover(context, {
                delay: { open: 1000 },
                restMs: 40,
            }),
            useFocus(context),
            useRole(context, { role: 'tooltip' }),
            useDismiss(context),
        ])

        useEffect(() => {
            if (refs.reference.current && refs.floating.current && open) {
                return autoUpdate(
                    refs.reference.current,
                    refs.floating.current,
                    update
                )
            }
        }, [refs.reference, refs.floating, update, open])

        const staticSide = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right',
        }[placement.split('-')[0]]

        return (
            <>
                {cloneElement(
                    children,
                    getReferenceProps({ ref: reference, ...children.props })
                )}
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                type: 'spring',
                                damping: 20,
                                stiffness: 300,
                            }}
                            data-testid="tooltip"
                            {...getFloatingProps({
                                ref: floating,
                                className:
                                    'pt-[8px] pb-[4px] px-3 bg-black bg-opacity-80 rounded-[4px] text-white leading-5',
                                style: {
                                    position: strategy,
                                    top: y ?? '',
                                    left: x ?? '',
                                },
                            })}>
                            {label}
                            <div
                                ref={arrowRef}
                                className="absolute overflow-hidden rotate-45 w-[8px] h-[8px] bg-black bg-opacity-80"
                                style={
                                    (staticSide && {
                                        left:
                                            arrowX != null ? `${arrowX}px` : '',
                                        top:
                                            arrowY != null ? `${arrowY}px` : '',
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
)
