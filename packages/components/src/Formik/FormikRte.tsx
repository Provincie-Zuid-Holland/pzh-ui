import { FastField, Field, FieldProps } from 'formik'

import { FormikError } from './FormikError'
import { FieldRte, FieldRteProps } from '../Form/FieldRte'

type FormikRteProps = FieldRteProps & {
    name: string
    optimized?: boolean
}

export const FormikRte = ({
    name,
    optimized = true,
    ...props
}: FormikRteProps) => {
    const Component = optimized ? FastField : Field

    return (
        <>
            <Component name={name}>
                {({ field, form }: FieldProps<any>) => (
                    <FieldRte
                        {...props}
                        {...field}
                        value={field.value ?? ''}
                        onBlur={value => {
                            form.setFieldValue(name, value)
                        }}
                    />
                )}
            </Component>
            <FormikError name={name} />
        </>
    )
}
