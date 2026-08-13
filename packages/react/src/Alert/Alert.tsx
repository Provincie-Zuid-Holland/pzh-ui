import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../utils'

export type AlertProps = React.ComponentProps<'div'> &
    VariantProps<typeof alertVariants>

const alertVariants = cva(
    'group/alert relative grid w-full gap-1 rounded border p-4 text-left has-data-[slot=alert-action]:pr-12 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 has-[>svg]:items-start *:[svg]:self-center *:[svg]:translate-y-0 *:data-[slot=alert-description]:text-s *:data-[slot=alert-title]:font-bold *:data-[slot=alert-action]:flex prose [&_:is(p,ul,li)]:my-0 prose-ul:pl-5 marker:text-xs marker:text-current',
    {
        variants: {
            variant: {
                default:
                    'bg-info-background border-info-border text-info-foreground',
                warning:
                    'bg-warning-background border-warning-border text-warning-foreground',
                positive:
                    'bg-success-background border-success-border text-success-foreground',
                negative:
                    'bg-destructive-background border-destructive-border text-destructive-foreground',
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
            data-testid="alert"
            {...props}
        />
    )
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="alert-title"
            className={cn(
                'not-prose font-bold group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-2',
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
                'text-balance group-has-[>svg]/alert:col-start-2 md:text-pretty [&_:is(p,ul,ol):not(:last-child)]:mb-4 [&_a]:underline [&_a]:underline-offset-2',
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
