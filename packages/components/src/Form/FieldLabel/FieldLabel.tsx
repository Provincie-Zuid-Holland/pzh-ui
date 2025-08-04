/**
 * Form label element
 */
import { ReactNode } from 'react'

import { CircleInfo } from '@pzh-ui/icons'

import { Tooltip } from '../../Tooltip'
import { cn } from '../../utils'

export interface FieldLabelProps {
    name: string
    label: string
    required?: boolean
    description?: string | ReactNode
    tooltip?: string | JSX.Element
    className?: string
    hasError?: boolean
}

export const FieldLabel = ({
    name,
    label,
    required,
    description,
    tooltip,
    className,
    hasError,
}: FieldLabelProps) => (
    <div className={cn('mb-2', className)}>
        <div className="flex items-center">
            <label htmlFor={name} className="text-pzh-blue-500 font-bold">
                {label}
                {required && (
                    <span
                        className={cn('ml-1', {
                            'text-pzh-red-500': hasError,
                        })}>
                        *
                    </span>
                )}
            </label>
            {tooltip && (
                <Tooltip label={tooltip}>
                    <CircleInfo className="text-pzh-blue-500 -mt-1 ml-1 cursor-pointer" />
                </Tooltip>
            )}
        </div>
        {description && <p className="text-s leading-5">{description}</p>}
    </div>
)
