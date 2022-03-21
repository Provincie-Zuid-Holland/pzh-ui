import { FastField, Field, FieldProps } from 'formik'

import { FormikError } from './FormikError'
import { FieldCheckbox, FieldCheckboxProps } from '../Form/FieldCheckbox'

type FormikCheckboxProps = FieldCheckboxProps & {
    name: string
    optimized?: boolean
}

export const FormikCheckbox = ({
    name,
    optimized = true,
    ...props
}: FormikCheckboxProps) => {
    const Component = optimized ? FastField : Field

    return (
        <>
            <Component name={name}>
                {({ field }: FieldProps<any>) => (
                    <FieldCheckbox {...props} {...field} />
                )}
            </Component>
            <FormikError name={name} />
        </>
    )
}
