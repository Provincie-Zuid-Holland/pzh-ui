import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../utils'

export type AlertProps = React.ComponentProps<'div'> &
    VariantProps<typeof alertVariants>

const alertVariants = cva(
    'group/alert gap-1 rounded p-4 has-data-[slot=alert-action]:pr-12 has-[>svg]:gap-x-2 *:[svg]:translate-y-0 *:data-[slot=alert-description]:text-s *:data-[slot=alert-title]:font-bold [&_:is(p,ul,li)]:my-0 marker:text-xs relative grid w-full max-w-none border text-left marker:text-current has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:items-start *:data-[slot=alert-action]:flex *:[svg]:self-center',
    {
        variants: {
            variant: {
                default:
                    'border-info-border bg-info-background text-info-foreground',
                warning:
                    'border-warning-border bg-warning-background text-warning-foreground',
                positive:
                    'border-success-border bg-success-background text-success-foreground',
                negative:
                    'border-destructive-border bg-destructive-background text-destructive-foreground',
            },
            size: {
                m: 'rounded-lg *:data-[slot=alert-title]:text-heading-s *:data-[slot=alert-action]:top-4 *:data-[slot=alert-action]:right-4',
                s: '*:data-[slot=alert-title]:text-heading-xs *:data-[slot=alert-action]:top-2 *:data-[slot=alert-action]:right-2 pl-4 pr-2 py-2',
                xs: '*:data-[slot=alert-title]:text-s *:data-[slot=alert-description]:text-xs *:data-[slot=alert-action]:top-1 *:data-[slot=alert-action]:right-1 pl-2 pr-1 py-1 gap-0',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'm',
        },
    }
)

function Alert({
    className,
    variant,
    size,
    role = 'status',
    ...props
}: AlertProps) {
    return (
        <div
            data-slot="alert"
            role={role}
            className={cn(alertVariants({ variant, size }), className)}
            {...props}
        />
    )
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="alert-title"
            className={cn(
                'font-bold group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-2',
                className
            )}
            {...props}
        />
    )
}

function AlertDescription({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="alert-description"
            className={cn(
                'typeset md:text-pretty [&_:is(p,ul,ol):not(:last-child)]:mb-4 text-balance group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-2',
                className
            )}
            {...props}
        />
    )
}

function AlertAction({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="alert-action"
            className={cn('absolute', className)}
            {...props}
        />
    )
}

export { Alert, AlertAction, AlertDescription, AlertTitle }
