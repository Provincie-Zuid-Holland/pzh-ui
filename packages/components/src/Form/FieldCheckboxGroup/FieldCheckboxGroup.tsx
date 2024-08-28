import clsx from 'clsx'

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
    value: string[]
    hasError?: boolean
    layout?: 'horizontal' | 'vertical'
}

export const FieldCheckboxGroup = ({
    name,
    options,
    value,
    layout = 'vertical',
    onChange,
    className,
    ...props
}: FieldCheckboxGroupProps) => (
    <div
        className={clsx(
            'flex',
            {
                'flex-col gap-2': layout === 'vertical',
                'gap-2 md:gap-4': layout === 'horizontal',
            },
            className
        )}>
        {options.map((option, index) => {
            const checked = Boolean(value && value.includes(option.value))

            return (
                <FieldCheckbox
                    key={`${option.value}-${index}`}
                    name={name}
                    value={option.value}
                    onChange={onChange}
                    className={clsx({
                        'w-fit': layout === 'vertical',
                    })}
                    {...props}
                    checked={checked}>
                    {option.label}
                </FieldCheckbox>
            )
        })}
    </div>
)
