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
import { Transition } from '@headlessui/react'
import { cloneElement, useEffect, useRef, useState } from 'react'

export interface TooltipProps {
    label: string | JSX.Element
    placement?: Placement
    children: JSX.Element
}

export const Tooltip = ({
    children,
    label,
    placement = 'bottom',
}: TooltipProps) => {
    const [open, setOpen] = useState(false)

    const arrowRef = useRef(null)

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
                getReferenceProps({ ref: refs.setReference, ...children.props })
            )}
            <Transition
                data-testid="tooltip"
                show={open}
                enter="transition-all ease-out duration-100 transform"
                enterFrom="scale-90 opacity-0"
                enterTo="scale-100 opacity-100"
                leave="transition-all ease-in duration-100 transform"
                leaveFrom="scale-100 opacity-100"
                leaveTo="scale-90 opacity-0"
                {...getFloatingProps({
                    ref: refs.setFloating,
                    className:
                        'px-3 rounded max-w-[300px] text-white font-normal leading-5',
                    style: {
                        position: strategy,
                        top: y ?? '',
                        left: x ?? '',
                        paddingTop: 8,
                        paddingBottom: 4,
                        fontFamily: 'Karbon Regular',
                        background: '#333333',
                    },
                })}>
                    {label}
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
            </Transition>
        </>
    )
}
