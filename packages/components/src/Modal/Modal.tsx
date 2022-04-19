import { Dialog, Transition } from '@headlessui/react'
import { Xmark } from '@pzh-ui/icons'
import classNames from 'classnames'
import { Fragment, ReactNode } from 'react'
import { useWindowSize } from 'react-use'

export interface ModalProps {
    open?: boolean
    onClose: () => void
    maxWidth?: string
    containerPadding?: string
    ariaLabel: string
    closeButton?: boolean
    position?: 'fixed' | 'absolute'
    children: ReactNode
}

export const Modal = ({
    children,
    open,
    onClose,
    maxWidth = 'max-w-6xl',
    containerPadding = 'sm:p-8 p-6',
    ariaLabel,
    closeButton,
    position = 'fixed',
}: ModalProps) => {
    if (position === 'absolute') {
        return (
            <Transition show={open} as={Fragment}>
                <div
                    className="h-full inset-0 z-50 overflow-hidden"
                    aria-label={ariaLabel}>
                    <ModalInner
                        containerPadding={containerPadding}
                        closeButton={closeButton}
                        onClose={onClose}
                        maxWidth={maxWidth}
                        position={position}>
                        {children}
                    </ModalInner>
                </div>
            </Transition>
        )
    }

    return (
        <Transition show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-hidden"
                onClose={onClose}
                aria-label={ariaLabel}>
                <ModalInner
                    containerPadding={containerPadding}
                    closeButton={closeButton}
                    onClose={onClose}
                    maxWidth={maxWidth}
                    position={position}>
                    {children}
                </ModalInner>
            </Dialog>
        </Transition>
    )
}

const ModalInner = ({
    containerPadding,
    closeButton,
    onClose,
    maxWidth,
    position,
    children,
}: Partial<ModalProps>) => {
    const { width: screenWidth } = useWindowSize()

    return (
        <div
            className={classNames(
                'flex items-center justify-center overflow-hidden text-center rounded-lg sm:block px-4 pt-4 pb-4 sm:p-2',
                {
                    'min-h-screen': position === 'fixed',
                    'h-full': position === 'absolute',
                }
            )}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                {position === 'fixed' ? (
                    <Dialog.Overlay className="fixed inset-0 transition-opacity bg-opacity-50 bg-pzh-cool-gray-dark" />
                ) : (
                    <div className="absolute inset-0 transition-opacity bg-opacity-50 bg-pzh-cool-gray-dark" />
                )}
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
                className={classNames(
                    'hidden sm:inline-block sm:align-middle',
                    {
                        'sm:h-screen': position === 'fixed',
                        'h-full': position === 'absolute',
                    }
                )}
                aria-hidden="true">
                &#8203;
            </span>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <div
                    className={`inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded shadow-xl sm:my-8 sm:align-middle sm:w-full ${maxWidth}`}>
                    <div
                        className={`overflow-y-auto ${containerPadding}`}
                        style={{
                            maxHeight:
                                screenWidth < 640
                                    ? 'calc(100vh - 2rem)' // 2rem equals the top and bottom padding
                                    : '75vh',
                        }}>
                        {closeButton && (
                            <div className="absolute top-0 right-0 z-10 block pt-8 pr-8 -mt-8 -mr-8 sm:-mt-2 sm:-mr-2">
                                <button
                                    type="button"
                                    className="p-2 pb-0 text-pzh-blue-dark rounded-md pointer-events-auto hover:text-pzh-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={onClose}>
                                    <Xmark className="w-4 h-4" />
                                    <span className="sr-only">Close</span>
                                </button>
                            </div>
                        )}
                        <div className="pointer-events-auto">{children}</div>
                    </div>
                </div>
            </Transition.Child>
        </div>
    )
}
