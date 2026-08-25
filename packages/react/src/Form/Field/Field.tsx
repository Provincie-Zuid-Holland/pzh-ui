import { useMemo } from 'react'

import { Ban } from '@pzh-ui/icons'

import { Alert, AlertTitle } from '../../Alert'
import { Label } from '../../Label'
import { cn } from '../../utils'

function Field({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            role="group"
            data-slot="field"
            className={cn(
                'group/field gap-1 flex w-full flex-col',
                '[&>[data-invalid]+[data-slot=field-error]]:-mt-1',
                className
            )}
            {...props}
        />
    )
}

export type FieldLabelProps = {
    required?: boolean
} & React.ComponentProps<typeof Label>

function FieldLabel({
    required = false,
    className,
    children,
    ...props
}: FieldLabelProps) {
    return (
        <Label
            data-slot="field-label"
            className={cn(
                'group/field-label peer/field-label gap-2 leading-snug flex w-fit',
                'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
                className
            )}
            {...props}>
            {children}
            {required && <span>*</span>}
        </Label>
    )
}

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
    return (
        <p
            data-slot="field-description"
            className={cn(
                'text-s leading-normal font-normal text-left',
                'last:mt-0 nth-last-2:-mt-1',
                '[&>a]:underline [&>a]:underline-offset-2',
                className
            )}
            {...props}
        />
    )
}

function FieldError({
    children,
    errors,
    className,
    ...props
}: React.ComponentProps<'div'> & {
    errors?: Array<{ message?: string } | undefined>
}) {
    const content = useMemo(() => {
        if (children) {
            return children
        }
        if (!errors?.length) {
            return null
        }
        const uniqueErrors = [
            ...new Map(errors.map(error => [error?.message, error])).values(),
        ]
        if (uniqueErrors?.length == 1) {
            return uniqueErrors[0]?.message
        }
        return (
            <ul className="ml-4 gap-1 flex list-disc flex-col">
                {uniqueErrors.map(
                    (error, index) =>
                        error?.message && <li key={index}>{error.message}</li>
                )}
            </ul>
        )
    }, [children, errors])
    if (!content) {
        return null
    }
    return (
        <Alert
            role="alert"
            data-slot="field-error"
            variant="negative"
            size="s"
            className={cn('w-full rounded-t-none border-t-0', className)}
            {...props}>
            <Ban size={16} className="min-w-4" />
            <AlertTitle>{content}</AlertTitle>
        </Alert>
    )
}

export { Field, FieldDescription, FieldError, FieldLabel }
