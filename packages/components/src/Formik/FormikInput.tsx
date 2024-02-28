import { FastField, Field, FieldProps } from 'formik'

import { FieldInput, FieldInputProps } from '../Form/FieldInput'
import { FormikError } from './FormikError'

type FormikInputProps = FieldInputProps & {
    name: string
    optimized?: boolean
}

export const FormikInput = ({
    name,
    type = 'text',
    optimized = true,
    ...props
}: FormikInputProps) => {
    const Component = optimized ? FastField : Field

    return (
        <>
            <Component name={name}>
                {({ field, meta }: FieldProps<any>) => (
                    <FieldInput
                        type={type}
                        {...props}
                        {...field}
                        value={field.value ?? ''}
                        hasError={Boolean(meta.touched && meta.error)}
                    />
                )}
            </Component>
            <FormikError name={name} />
        </>
    )
}
