import { FieldRadio, FieldRadioProps } from '../FieldRadio'

/**
 * Form radio group element
 */

export interface FieldRadioGroupProps {
    options: FieldRadioProps[]
    classes?: string
}

export const FieldRadioGroup = ({ options, classes }: FieldRadioGroupProps) => (
    <div className={classes}>
        {options.map(({ label, id, name }, index) => (
            <FieldRadio
                key={id}
                label={label}
                name={name}
                id={id}
                classes={index + 1 !== options.length ? 'mb-2' : undefined}
            />
        ))}
    </div>
)
