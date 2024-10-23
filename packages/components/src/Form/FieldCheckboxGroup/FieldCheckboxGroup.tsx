import clsx from 'clsx'
import { ReactNode } from 'react'

import { FieldCheckbox, FieldCheckboxProps } from '../FieldCheckbox'
import { FieldLabel } from '../FieldLabel'

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
    label?: string
    description?: string | ReactNode
    value: string[]
    hasError?: boolean
    layout?: 'default' | 'grid'
    optionLayout?: 'horizontal' | 'vertical'
    tooltip?: string | JSX.Element
}

export const FieldCheckboxGroup = ({
    name,
    label,
    description,
    required,
    options,
    value,
    layout = 'default',
    optionLayout = 'vertical',
    tooltip,
    onChange,
    className,
    ...props
}: FieldCheckboxGroupProps) => (
    <div
        className={clsx({
            'grid grid-cols-6 gap-2 md:gap-8': layout === 'grid',
        })}>
        {label && (
            <FieldLabel
                name={name}
                label={label}
                description={description}
                required={required}
                tooltip={tooltip}
                className={clsx({
                    'col-span-6 mb-0 mt-2 md:col-span-2': layout === 'grid',
                })}
            />
        )}
        <div
            className={clsx(
                'flex',
                {
                    'flex-col gap-2': optionLayout === 'vertical',
                    'gap-2 md:gap-4': optionLayout === 'horizontal',
                    'col-span-6 md:col-span-4': layout === 'grid',
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
                            'w-fit': optionLayout === 'vertical',
                        })}
                        {...props}
                        checked={checked}>
                        {option.label}
                    </FieldCheckbox>
                )
            })}
        </div>
    </div>
)
