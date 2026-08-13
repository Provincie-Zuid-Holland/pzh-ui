import { Ban } from '@pzh-ui/icons'
import { useMemo } from 'react'
import { Alert, AlertTitle } from '../../Alert'
import { Label } from '../../Label'
import { cn } from '../../utils'

function Field({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            role="group"
            data-slot="field"
            data-testid="field"
            className={cn('group/field flex w-full gap-1', className)}
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
            data-testid="field-label"
            className={cn(
                'group/field-label peer/field-label flex w-fit gap-2 leading-snug',
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
            data-testid="field-description"
            className={cn(
                'text-s text-left leading-normal font-normal',
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
            <ul className="ml-4 flex list-disc flex-col gap-1">
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
            data-testid="field-error"
            variant="negative"
            size="s"
            className="rounded-t-none border-t-0"
            {...props}>
            <Ban size={16} className="min-w-4" />
            <AlertTitle>{content}</AlertTitle>
        </Alert>
    )
}

export { Field, FieldDescription, FieldError, FieldLabel }
