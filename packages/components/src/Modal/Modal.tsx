import { forwardRef, useRef } from 'react'
import {
    Overlay,
    useModalOverlay,
    ModalProviderProps,
    AriaModalOverlayProps,
} from 'react-aria'
import { OverlayTriggerProps, useOverlayTriggerState } from 'react-stately'
import { Dialog } from '../Dialog'
import { Button } from '../Button'
import { Xmark } from '@pzh-ui/icons'
import { useEnterAnimation, useExitAnimation, useRenderProps } from './utils'
import { useObjectRef } from '@react-aria/utils'
import classNames from 'classnames'

export interface ModalProps
    extends ModalProviderProps,
        AriaModalOverlayProps,
        OverlayTriggerProps {
    size?: 's' | 'm' | 'l' | 'xl'
}

export const Modal = ({
    children,
    isDismissable = true,
    size = 'm',
    ...props
}: ModalProps) => {
    const state = useOverlayTriggerState(props)

    const ref = useRef(null)
    const { modalProps, underlayProps } = useModalOverlay(
        { ...props, isDismissable },
        state,
        ref
    )

    let objectRef = useObjectRef(ref)
    let isExiting = useExitAnimation(objectRef, state.isOpen)

    if (!state.isOpen && !isExiting) return null

    return (
        <Overlay isExiting={isExiting}>
            <div
                className="fixed bottom-0 left-0 right-0 top-0 z-[100] flex items-center justify-center bg-black/30 duration-300 ease-in-out"
                {...underlayProps}>
                <ModalInner
                    {...modalProps}
                    isDismissable={isDismissable}
                    onClose={state.close}
                    ref={objectRef}
                    isExiting={isExiting}
                    size={size}>
                    {children}
                </ModalInner>
            </div>
        </Overlay>
    )
}

interface ModalInnerProps extends ModalProps {
    isExiting: boolean
    onClose: () => void
}

const ModalInner = forwardRef<HTMLDivElement, ModalInnerProps>(
    (
        { isDismissable, isExiting, onClose, size, onKeyDown, ...rest },
        objectRef
    ) => {
        let ref = useObjectRef(objectRef)
        let entering = useEnterAnimation(ref)

        let renderProps = useRenderProps({
            ...rest,
            className: classNames('pzh-modal w-full', {
                'max-w-[600px]': size === 's',
                'max-w-[812px]': size === 'm',
                'max-w-[980px]': size === 'l',
                'max-w-[1200px]': size === 'xl',
            }),
            values: {
                isEntering: entering,
                isExiting,
            },
        })

        return (
            <div
                {...renderProps}
                data-entering={entering || undefined}
                data-exiting={isExiting || undefined}
                ref={ref}
                onKeyDown={onKeyDown}>
                <Dialog className="bg-pzh-white relative w-full overflow-hidden rounded-[4px] shadow-[0_1.1970183849334717px_3.9900612831115723px_0_rgba(0,0,0,0.0283),0_4.020535469055176px_13.401785850524902px_0_rgba(0,0,0,0.0417),0_18px_60px_0_rgba(0,0,0,0.07)] outline-none duration-300 ease-in-out">
                    {isDismissable && onClose && (
                        <Button
                            variant="default"
                            onPress={onClose}
                            className="absolute right-8 top-[24px]">
                            <span className="sr-only">Sluiten</span>
                            <Xmark size={20} className="text-pzh-blue-dark" />
                        </Button>
                    )}
                    {renderProps.children}
                </Dialog>
            </div>
        )
    }
)
