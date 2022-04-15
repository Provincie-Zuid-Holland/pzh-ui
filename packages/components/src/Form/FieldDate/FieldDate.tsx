import { forwardRef, useState } from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { useUpdateEffect } from 'react-use'
import nl from 'date-fns/locale/nl'
import classNames from 'classnames'

import { FieldLabel } from '../FieldLabel'
import { FieldInputProps } from '../FieldInput'
import { CalendarAlt } from '@pzh-ui/icons'

/**
 * Form date element
 */

export interface FieldDateProps extends Omit<ReactDatePickerProps, 'onChange'> {
    name: string
    label?: string
    required?: boolean
    description?: string
    placeholder?: string
    onClose?: () => void
    onChange: (date: Date | null) => void
    hasError?: boolean
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
    ...props
}: FieldDateProps) => {
    const [date, setDate] = useState<Date | null>(null)

    useUpdateEffect(() => onChange(date), [date])

    return (
        <>
            {label && (
                <FieldLabel
                    name={name}
                    label={label}
                    description={description}
                    required={required}
                />
            )}
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
                customInput={<DateInput name={name} />}
                dateFormat={dateFormat}
                onCalendarClose={onClose}
                selected={date}
                placeholderText={placeholder || placeholderText}
                {...props}
                onChange={(date: Date | null) => setDate(date)}
            />
        </>
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
