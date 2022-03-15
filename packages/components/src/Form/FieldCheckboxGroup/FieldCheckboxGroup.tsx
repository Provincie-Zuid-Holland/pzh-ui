import { FieldCheckbox, FieldCheckboxProps } from '../FieldCheckbox'

/**
 * Form radio group element
 */

export interface FieldCheckboxGroupProps {
    options: FieldCheckboxProps[]
    classes?: string
}

export const FieldCheckboxGroup = ({
    options,
    classes,
}: FieldCheckboxGroupProps) => (
    <div className={classes}>
        {options.map(({ label, id, name }, index) => (
            <FieldCheckbox
                key={id}
                label={label}
                name={name}
                id={id}
                classes={index + 1 !== options.length ? 'mb-2' : undefined}
            />
        ))}
    </div>
)
