'use client'

import { createContext, useContext, useMemo } from 'react'

import { Ban } from '@pzh-ui/icons'

import { Alert, AlertTitle } from '../../Alert'
import { Label } from '../../Label'
import { cn } from '../../utils'

export type FieldSize = 'l' | 'm'

const FieldSizeContext = createContext<FieldSize>('l')

export type FieldProps = React.ComponentProps<'div'> & {
    size?: FieldSize
}

function Field({ className, size, ...props }: FieldProps) {
    const inheritedSize = useContext(FieldSizeContext)

    return (
        <FieldSizeContext.Provider value={size ?? inheritedSize}>
            <div
                role="group"
                data-slot="field"
                className={cn(
                    'group/field gap-1 flex w-full flex-col',
                    '[&>[data-slot=field-label]+[data-slot=field-description]]:-mt-1',
                    '[&>[data-invalid]+[data-slot=field-error]]:-mt-1',
                    className
                )}
                {...props}
            />
        </FieldSizeContext.Provider>
    )
}

export type FieldLabelProps = {
    required?: boolean
} & React.ComponentProps<typeof Label>

function FieldLabel({
    required = false,
    size,
    className,
    children,
    ...props
}: FieldLabelProps) {
    const inheritedSize = useContext(FieldSizeContext)

    return (
        <Label
            size={size ?? inheritedSize}
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

export type FieldDescriptionProps = React.ComponentProps<'p'> & {
    size?: FieldSize
}

function FieldDescription({
    className,
    size,
    ...props
}: FieldDescriptionProps) {
    const inheritedSize = useContext(FieldSizeContext)
    const resolvedSize = size ?? inheritedSize

    return (
        <p
            data-slot="field-description"
            className={cn(
                'leading-normal font-normal text-left',
                resolvedSize === 'm' ? 'text-xs' : 'text-s',
                'last:mt-0 nth-last-2:-mt-1',
                '[&>a]:underline [&>a]:underline-offset-2',
                className
            )}
            {...props}
        />
    )
}

export type FieldErrorProps = React.ComponentProps<'div'> & {
    size?: FieldSize
    errors?: Array<{ message?: string } | undefined>
}

function FieldError({
    children,
    errors,
    className,
    size,
    ...props
}: FieldErrorProps) {
    const inheritedSize = useContext(FieldSizeContext)
    const resolvedSize = size ?? inheritedSize

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
            size={resolvedSize === 'm' ? 'xs' : 's'}
            className={cn(
                'w-full rounded-t-none border-t-0',
                resolvedSize === 'm'
                    ? '*:data-[slot=alert-title]:text-xs'
                    : '*:data-[slot=alert-title]:text-s',
                className
            )}
            {...props}>
            <Ban size={resolvedSize === 'm' ? 14 : 16} className="min-w-4" />
            <AlertTitle>{content}</AlertTitle>
        </Alert>
    )
}

export { Field, FieldDescription, FieldError, FieldLabel }
