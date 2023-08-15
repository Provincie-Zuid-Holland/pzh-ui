/**
 * Form label element
 */

import { CircleInfo } from '@pzh-ui/icons'
import classNames from 'classnames'
import { ReactNode } from 'react'
import { Tooltip } from '../..'

export interface FieldLabelProps {
    name: string
    label: string
    required?: boolean
    description?: string | ReactNode
    tooltip?: string | JSX.Element
    className?: string
}

export const FieldLabel = ({
    name,
    label,
    required,
    description,
    tooltip,
    className,
}: FieldLabelProps) => (
    <div className={classNames('mb-1', className)}>
        <div className="flex items-center">
            <label htmlFor={name} className="text-pzh-blue-dark font-bold">
                {label}
                {required && <span className="text-pzh-red ml-1">*</span>}
            </label>
            {tooltip && (
                <Tooltip label={tooltip}>
                    <CircleInfo className="text-pzh-blue-dark -mt-1 ml-1 cursor-pointer" />
                </Tooltip>
            )}
        </div>
        {description && (
            <p className="text-[0.8rem] leading-5">{description}</p>
        )}
    </div>
)
