import classNames from 'clsx'
import { ReactNode } from 'react'
import { FieldLabel } from '..'
import { FieldRadio, FieldRadioProps } from '../FieldRadio'

/**
 * Form radio group element
 */

interface Option {
    value: string | number
    label: string
}

export interface FieldRadioGroupProps extends FieldRadioProps {
    options: Option[]
    name: string
    label?: string
    description?: string | ReactNode
    value?: string
    hasError?: boolean
    layout?: 'default' | 'grid'
    optionLayout?: 'horizontal' | 'vertical'
    tooltip?: string | JSX.Element
}

export const FieldRadioGroup = ({
    options,
    value,
    name,
    label,
    description,
    layout,
    optionLayout = 'vertical',
    tooltip,
    required,
    ...props
}: FieldRadioGroupProps) => (
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
            className={classNames('flex', {
                'flex-col': optionLayout === 'vertical',
            })}>
            {options.map((option, index) => (
                <FieldRadio
                    key={`${option.value}-${index}`}
                    name={name}
                    value={option.value}
                    className={classNames({
                        'mr-8':
                            index + 1 !== options.length &&
                            optionLayout === 'horizontal',
                        'mb-2':
                            index + 1 !== options.length &&
                            optionLayout !== 'horizontal',
                        'w-fit': optionLayout === 'vertical',
                    })}
                    {...props}
                    checked={value === option.value}>
                    {option.label}
                </FieldRadio>
            ))}
        </div>
    </div>
)
