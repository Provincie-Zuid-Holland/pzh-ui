import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames'
import FocusTrap from 'focus-trap-react'
import { Fragment, ReactNode } from 'react'
import { useWindowSize } from 'react-use'

import { Xmark } from '@pzh-ui/icons'

export interface OLDModalProps {
    open?: boolean
    onClose: () => void
    maxWidth?: string
    containerPadding?: string
    ariaLabel: string
    closeButton?: boolean
    position?: 'fixed' | 'absolute'
    overflowVisible?: boolean
    children: ReactNode
}

export const OLDModal = ({
    children,
    open,
    onClose,
    maxWidth = 'max-w-6xl',
    containerPadding = 'sm:p-8 p-6',
    ariaLabel,
    closeButton,
    overflowVisible = false,
    position = 'fixed',
}: OLDModalProps) => {
    if (position === 'absolute') {
        return (
            <Transition show={open} as={Fragment}>
                <div
                    className="z-1 absolute inset-0 h-full overflow-hidden"
                    aria-label={ariaLabel}>
                    <FocusTrap>
                        <div>
                            <ModalInner
                                overflowVisible={overflowVisible}
                                containerPadding={containerPadding}
                                closeButton={closeButton}
                                onClose={onClose}
                                maxWidth={maxWidth}
                                position={position}>
                                {children}
                            </ModalInner>
                        </div>
                    </FocusTrap>
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
                    overflowVisible={overflowVisible}
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
    overflowVisible,
}: Partial<OLDModalProps>) => {
    const { width: screenWidth } = useWindowSize()

    return (
        <div
            className={classNames(
                'flex items-center justify-center px-4 pb-4 pt-4 text-center sm:block sm:p-2',
                {
                    'overflow-hidden': !overflowVisible,
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
                    <Dialog.Overlay className="bg-pzh-cool-gray-dark fixed inset-0 bg-opacity-50 transition-opacity" />
                ) : (
                    <div className="bg-pzh-cool-gray-dark absolute inset-0 bg-opacity-50 transition-opacity" />
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
                    className={classNames(
                        `inline-block transform rounded bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:align-middle ${maxWidth}`,
                        { 'overflow-hidden': !overflowVisible }
                    )}>
                    <div
                        className={classNames(`${containerPadding}`, {
                            'overflow-y-auto': !overflowVisible,
                            'overflow-y-visible': overflowVisible,
                        })}
                        style={{
                            maxHeight:
                                screenWidth < 640
                                    ? 'calc(100vh - 2rem)' // 2rem equals the top and bottom padding
                                    : '90vh',
                        }}>
                        {closeButton && (
                            <div className="absolute right-0 top-0 z-10 -mr-8 -mt-8 block pr-8 pt-8 sm:-mr-2 sm:-mt-2">
                                <button
                                    type="button"
                                    className="text-pzh-blue-dark hover:text-pzh-blue focus:ring-pzh-blue-dark pointer-events-auto rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
                                    onClick={onClose}>
                                    <Xmark className="h-4 w-4" />
                                    <span className="sr-only">Sluiten</span>
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
