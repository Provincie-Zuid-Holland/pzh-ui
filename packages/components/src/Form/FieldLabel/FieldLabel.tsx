/**
 * Form label element
 */

export interface FieldLabelProps {
    name: string
    label: string
    required?: boolean
    description?: string
}

export const FieldLabel = ({
    name,
    label,
    required,
    description,
}: FieldLabelProps) => (
    <div className="mb-2">
        <label htmlFor={name} className="text-pzh-blue-dark font-bold">
            {label}
            {required && <span className="text-pzh-red ml-1">*</span>}
        </label>
        {description && (
            <p className="text-[0.8rem] leading-5">{description}</p>
        )}
    </div>
)
