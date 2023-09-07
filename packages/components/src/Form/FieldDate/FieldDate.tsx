import classNames from 'classnames'
import nl from 'date-fns/locale/nl'
import { ReactNode, forwardRef, useState } from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useUpdateEffect } from 'react-use'

import { CalendarAlt } from '@pzh-ui/icons'

import { FieldInputProps } from '../FieldInput'
import { FieldLabel } from '../FieldLabel'

/**
 * Form date element
 */

export interface FieldDateProps extends Omit<ReactDatePickerProps, 'onChange'> {
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
                    calendarClassName="pzh-datepicker"
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
