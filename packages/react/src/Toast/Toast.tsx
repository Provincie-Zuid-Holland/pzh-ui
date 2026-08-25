'use client'

import {
    Ban,
    CircleCheckSolid,
    CircleInfoSolid,
    Spinner,
    TriangleExclamationSolid,
    XmarkLarge,
} from '@pzh-ui/icons'

import { Toaster as Sonner, toast, type ToasterProps } from 'sonner'

import { cn } from '../utils'

export type ToastProps = ToasterProps

function Toaster({
    className,
    closeButton = true,
    icons,
    toastOptions,
    ...props
}: ToastProps) {
    return (
        <Sonner
            className={cn('toaster group', className)}
            closeButton={closeButton}
            gap={16}
            icons={{
                success: <CircleCheckSolid />,
                info: <CircleInfoSolid />,
                warning: <TriangleExclamationSolid />,
                error: <Ban />,
                loading: <Spinner className="animate-spin" />,
                close: <XmarkLarge />,
                ...icons,
            }}
            toastOptions={{
                unstyled: true,
                closeButtonAriaLabel: 'Melding sluiten',
                ...toastOptions,
                classNames: {
                    toast: cn(
                        'rounded-lg w-90 font-sans relative flex overflow-hidden bg-surface-raised shadow-popover',
                        'focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none',
                        toastOptions?.classNames?.toast
                    ),
                    content: cn(
                        'gap-1 min-w-0 p-4 pr-12 flex flex-1 flex-col',
                        toastOptions?.classNames?.content
                    ),
                    title: cn(
                        'text-heading-s font-bold text-primary',
                        toastOptions?.classNames?.title
                    ),
                    description: cn(
                        'text-s text-foreground',
                        toastOptions?.classNames?.description
                    ),
                    icon: cn(
                        '[&>svg]:size-5 w-12 flex items-center justify-center text-foreground',
                        toastOptions?.classNames?.icon
                    ),
                    closeButton: cn(
                        'top-4 right-4 size-6 p-0 absolute z-10 flex cursor-pointer items-center justify-center border-0 bg-transparent text-primary',
                        'rounded-sm hover:text-primary-hover focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none',
                        '[&>svg]:size-4',
                        toastOptions?.classNames?.closeButton
                    ),
                    info: cn(
                        '[&_[data-icon]]:bg-toast-info-background',
                        toastOptions?.classNames?.info
                    ),
                    warning: cn(
                        '[&_[data-icon]]:bg-toast-warning-background',
                        toastOptions?.classNames?.warning
                    ),
                    success: cn(
                        '[&_[data-icon]]:bg-toast-success-background',
                        toastOptions?.classNames?.success
                    ),
                    error: cn(
                        '[&_[data-icon]]:bg-toast-error-background',
                        toastOptions?.classNames?.error
                    ),
                    loading: cn(
                        '[&_[data-icon]]:bg-toast-info-background',
                        toastOptions?.classNames?.loading
                    ),
                    default: toastOptions?.classNames?.default,
                    loader: toastOptions?.classNames?.loader,
                    actionButton: toastOptions?.classNames?.actionButton,
                    cancelButton: toastOptions?.classNames?.cancelButton,
                },
            }}
            {...props}
        />
    )
}

export { Toaster, toast }
