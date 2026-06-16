import classNames from 'clsx'
import { ReactNode } from 'react'

import { NotificationProps } from '@pzh-ui/react'
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
    notification?: NotificationProps
    value?: string
    hasError?: boolean
    layout?: 'default' | 'grid'
    optionLayout?: 'horizontal' | 'vertical'
    tooltip?: string | React.JSX.Element
}

export const FieldRadioGroup = ({
    options,
    value,
    name,
    label,
    description,
    notification,
    layout,
    optionLayout = 'vertical',
    tooltip,
    required,
    hasError,
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
                notification={notification}
                required={required}
                tooltip={tooltip}
                className={classNames({
                    'col-span-6 mt-2 mb-0 md:col-span-2': layout === 'grid',
                })}
                hasError={hasError}
            />
        )}
        <div
            className={classNames('flex', {
                'flex-col gap-2': optionLayout === 'vertical',
                'gap-2 md:gap-4': optionLayout === 'horizontal',
            })}>
            {options.map((option, index) => (
                <FieldRadio
                    key={`${option.value}-${index}`}
                    name={name}
                    value={option.value}
                    className={classNames({
                        'w-fit': optionLayout === 'vertical',
                    })}
                    hasError={hasError}
                    {...props}
                    checked={value === option.value}>
                    {option.label}
                </FieldRadio>
            ))}
        </div>
    </div>
)
