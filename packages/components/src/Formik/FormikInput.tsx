import { FastField, Field, FieldProps } from 'formik'

import { FormikError } from './FormikError'
import { FieldInput, FieldInputProps } from '../Form/FieldInput'

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
                {({ field }: FieldProps<any>) => (
                    <FieldInput
                        type={type}
                        {...props}
                        {...field}
                        value={field.value ?? ''}
                    />
                )}
            </Component>
            <FormikError name={name} />
        </>
    )
}
