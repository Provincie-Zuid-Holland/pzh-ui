import { forwardRef } from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import nl from 'date-fns/locale/nl'
import { faCalendarAlt } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

import { FieldLabel } from '../FieldLabel'
import { FieldInputProps } from '../FieldInput'

/**
 * Form date element
 */

export interface FieldDateProps extends ReactDatePickerProps {
    name: string
    label?: string
    required?: boolean
    description?: string
}

export const FieldDate = ({
    name,
    label,
    required,
    description,
    dateFormat = 'dd-MM-yyyy',
    ...props
}: FieldDateProps) => (
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
            className="pzh-form-input"
            customInput={<DateInput name={name} />}
            dateFormat={dateFormat}
            {...props}
        />
    </>
)

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
