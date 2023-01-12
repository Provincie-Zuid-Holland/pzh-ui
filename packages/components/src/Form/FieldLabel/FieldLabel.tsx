/**
 * Form label element
 */

import classNames from 'classnames'
import { ReactNode } from 'react'

export interface FieldLabelProps {
    name: string
    label: string
    required?: boolean
    description?: string | ReactNode
    className?: string
}

export const FieldLabel = ({
    name,
    label,
    required,
    description,
    className,
}: FieldLabelProps) => (
    <div className={classNames('mb-2', className)}>
        <label htmlFor={name} className="text-pzh-blue-dark font-bold">
            {label}
            {required && <span className="text-pzh-red ml-1">*</span>}
        </label>
        {description && (
            <p className="text-[0.8rem] leading-5">{description}</p>
        )}
    </div>
)
