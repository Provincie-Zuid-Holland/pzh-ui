import { forwardRef, useState } from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { useUpdateEffect } from 'react-use'
import nl from 'date-fns/locale/nl'
import { faCalendarAlt } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

import { FieldLabel } from '../FieldLabel'
import { FieldInputProps } from '../FieldInput'

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
    onChange: (date: Date) => void
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
    ...props
}: FieldDateProps) => {
    const [date, setDate] = useState<Date | undefined>(undefined)

    useUpdateEffect(() => date && onChange(date), [date])

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
                className={classNames('pzh-form-input', {
                    'pzh-form-error': hasError,
                })}
                customInput={<DateInput name={name} />}
                dateFormat={dateFormat}
                onCalendarClose={onClose}
                selected={date}
                placeholderText={placeholder || placeholderText}
                {...props}
                onChange={(date: Date) => setDate(date)}
            />
        </>
    )
}

const DateInput = forwardRef<HTMLInputElement, FieldInputProps>(
    (props, ref) => (
        <div className="relative flex">
            <input type="text" {...props} ref={ref} />
            <FontAwesomeIcon
                className={classNames('absolute right-[14px] top-[14px]', {
                    'opacity-50': props.disabled,
                })}
                icon={faCalendarAlt}
            />
        </div>
    )
)
