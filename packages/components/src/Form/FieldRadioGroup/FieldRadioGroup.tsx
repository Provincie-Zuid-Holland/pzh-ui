import { FieldRadio, FieldRadioProps } from '../FieldRadio'

/**
 * Form radio group element
 */

interface Option {
    value: string
    label: string
}

export interface FieldRadioGroupProps extends FieldRadioProps {
    options: Option[]
    name: string
    value?: string
    hasError?: boolean
}

export const FieldRadioGroup = ({
    options,
    value,
    name,
    className,
    ...props
}: FieldRadioGroupProps) => (
    <div className={className}>
        {options.map((option, index) => (
            <FieldRadio
                key={`${option.value}-${index}`}
                name={name}
                value={option.value}
                className={index + 1 !== options.length ? 'mb-2' : undefined}
                {...props}
                checked={value === option.value}>
                {option.label}
            </FieldRadio>
        ))}
    </div>
)
