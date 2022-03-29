import { FieldCheckbox, FieldCheckboxProps } from '../FieldCheckbox'

/**
 * Form radio group element
 */

interface Option {
    value: string
    label: string
}

export interface FieldCheckboxGroupProps extends FieldCheckboxProps {
    options: Option[]
    name: string
    classes?: string
    value: string[]
    hasError?: boolean
}

export const FieldCheckboxGroup = ({
    name,
    options,
    value,
    onChange,
    classes,
    ...props
}: FieldCheckboxGroupProps) => (
    <div className={classes}>
        {options.map((option, index) => {
            const checked = Boolean(value && value.includes(option.value))

            return (
                <FieldCheckbox
                    key={`${option.value}-${index}`}
                    name={name}
                    value={option.value}
                    onChange={onChange}
                    classes={index + 1 !== options.length ? 'mb-2' : undefined}
                    {...props}
                    checked={checked}>
                    {option.label}
                </FieldCheckbox>
            )
        })}
    </div>
)
