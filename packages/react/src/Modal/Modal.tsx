'use client'

import * as React from 'react'
import {
    Dialog,
    DialogTrigger,
    Heading,
    ModalOverlay,
    Modal as ModalPrimitive,
    Text,
    type DialogProps,
    type DialogTriggerProps,
    type ModalOverlayProps,
} from 'react-aria-components'

import { XmarkLarge } from '@pzh-ui/icons'

import { cva, type VariantProps } from 'class-variance-authority'

import { Button, type ButtonProps } from '../Button'
import { cn } from '../utils'

export const modalVariants = cva(
    'min-w-0 rounded-lg relative w-full bg-surface text-foreground shadow-dialog outline-none',
    {
        variants: { size: { m: 'max-w-160', l: 'max-w-226' } },
        defaultVariants: { size: 'm' },
    }
)

export type ModalTriggerProps = DialogTriggerProps
export type ModalCloseProps = ButtonProps
export type ModalProps = Omit<DialogProps, 'className'> &
    VariantProps<typeof modalVariants> & {
        className?: string
        overlayProps?: Omit<ModalOverlayProps, 'children' | 'className'> & {
            className?: string
        }
        showCloseButton?: boolean
        closeLabel?: string
    }
export type ModalHeaderProps = React.ComponentProps<'div'>
export type ModalTitleProps = React.ComponentProps<typeof Heading>
export type ModalDescriptionProps = React.ComponentProps<typeof Text>
export type ModalBodyProps = React.ComponentProps<'div'>
export type ModalFooterProps = React.ComponentProps<'div'>

function ModalTrigger(props: ModalTriggerProps) {
    return <DialogTrigger {...props} />
}

function ModalClose(props: ModalCloseProps) {
    return <Button slot="close" {...props} />
}

function Modal({
    size = 'm',
    className,
    overlayProps,
    showCloseButton = true,
    closeLabel = 'Sluiten',
    children,
    ...props
}: ModalProps) {
    const { className: overlayClassName, ...restOverlayProps } =
        overlayProps ?? {}

    return (
        <ModalOverlay
            isDismissable
            {...restOverlayProps}
            data-slot="modal-overlay"
            className={cn(
                'inset-0 p-4 fixed z-50 flex items-center justify-center bg-foreground/40',
                overlayClassName
            )}>
            <ModalPrimitive
                data-slot="modal"
                data-size={size}
                className={modalVariants({ size })}>
                <Dialog
                    {...props}
                    data-slot="modal-content"
                    className={cn(
                        'gap-4 p-6 sm:p-8 relative flex max-h-[calc(100dvh-2rem)] flex-col overflow-y-auto outline-none',
                        className
                    )}>
                    {values => (
                        <>
                            {typeof children === 'function'
                                ? children(values)
                                : children}
                            {showCloseButton && (
                                <ModalClose
                                    variant="default"
                                    aria-label={closeLabel}
                                    className="right-4 top-4 h-10 w-10 p-2 sm:right-6 sm:top-6 absolute text-primary">
                                    <XmarkLarge size={14} />
                                </ModalClose>
                            )}
                        </>
                    )}
                </Dialog>
            </ModalPrimitive>
        </ModalOverlay>
    )
}

function ModalHeader({ className, ...props }: ModalHeaderProps) {
    return (
        <div
            data-slot="modal-header"
            className={cn('pr-12 flex flex-col text-primary', className)}
            {...props}
        />
    )
}

function ModalTitle({ className, ...props }: ModalTitleProps) {
    return (
        <Heading
            slot="title"
            data-slot="modal-title"
            className={cn('text-heading-m font-bold', className)}
            {...props}
        />
    )
}

function ModalDescription({ className, ...props }: ModalDescriptionProps) {
    return (
        <Text
            slot="description"
            data-slot="modal-description"
            className={cn('typeset typeset-compact', className)}
            {...props}
        />
    )
}

function ModalBody({ className, ...props }: ModalBodyProps) {
    return (
        <div
            data-slot="modal-body"
            className={cn('typeset typeset-compact', className)}
            {...props}
        />
    )
}

function ModalFooter({ className, ...props }: ModalFooterProps) {
    return (
        <div
            data-slot="modal-footer"
            className={cn(
                'gap-4 sm:flex-row sm:items-center sm:justify-between flex flex-col',
                className
            )}
            {...props}
        />
    )
}

export {
    Modal,
    ModalTrigger,
    ModalClose,
    ModalHeader,
    ModalTitle,
    ModalDescription,
    ModalBody,
    ModalFooter,
}
