import { CalendarAlt } from '@pzh-ui/icons'
import { useUpdateEffect } from '@react-hookz/web'
import classNames from 'clsx'
import { nl } from 'date-fns/locale'
import { ReactNode, forwardRef, useState } from 'react'
import ReactDatePicker, { type DatePickerProps } from 'react-datepicker'

import { FieldInputProps } from '../FieldInput'
import { FieldLabel } from '../FieldLabel'

import './style.css'

// @ts-ignore
const DatePicker =
    (ReactDatePicker as unknown as { default: typeof ReactDatePicker })
        .default ?? ReactDatePicker

/**
 * Form date element
 */

export interface FieldDateProps
    extends Omit<
        DatePickerProps,
        'onChange' | 'selectsRange' | 'selectsMultiple'
    > {
    name: string
    label?: string
    required?: boolean
    description?: string | ReactNode
    placeholder?: string
    onClose?: () => void
    onChange: (date: Date | null) => void
    hasError?: boolean
    layout?: 'default' | 'grid'
    tooltip?: string | JSX.Element
}

export const FieldDate = ({
    name,
    label,
    required,
    description,
    dateFormat = 'dd-MM-yyyy',
    placeholder,
    placeholderText,
    onClose,
    onChange,
    hasError,
    className,
    value,
    layout = 'default',
    tooltip,
    ...props
}: FieldDateProps) => {
    const [date, setDate] = useState<Date | null>(
        value ? new Date(value) : null
    )

    useUpdateEffect(() => onChange(date), [date])
    useUpdateEffect(() => {
        !date && value && setDate(new Date(value))
    }, [value])

    return (
        <div
            className={classNames({
                'grid grid-cols-6 gap-2 md:gap-8': layout === 'grid',
            })}>
            {label && (
                <FieldLabel
                    name={name}
                    label={label}
                    description={description}
                    required={required}
                    tooltip={tooltip}
                    className={classNames({
                        'col-span-6 mb-0 mt-2 md:col-span-2': layout === 'grid',
                    })}
                />
            )}
            <div
                className={classNames({
                    'col-span-6 md:col-span-4': layout === 'grid',
                })}>
                {/** @ts-ignore */}
                <DatePicker
                    locale={nl}
                    name={name}
                    required={required}
                    className={classNames(
                        'pzh-form-input',
                        {
                            'pzh-form-error': hasError,
                        },
                        className
                    )}
                    wrapperClassName="w-full"
                    popperClassName="pzh-datepicker"
                    customInput={<DateInput name={name} />}
                    dateFormat={dateFormat}
                    onCalendarClose={onClose}
                    selected={date}
                    placeholderText={placeholder || placeholderText}
                    {...props}
                    onChange={(date: Date | null) => setDate(date)}
                />
            </div>
        </div>
    )
}

const DateInput = forwardRef<HTMLInputElement, FieldInputProps>(
    (props, ref) => (
        <div className="relative flex">
            <input type="text" {...props} ref={ref} />
            <CalendarAlt
                size={20}
                className={classNames('absolute right-[14px] top-[14px]', {
                    'opacity-50': props.disabled,
                })}
            />
        </div>
    )
)
