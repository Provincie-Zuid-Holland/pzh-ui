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
                {({ field, form, meta }: FieldProps<any>) => (
                    <FieldRte
                        {...props}
                        {...field}
                        initialContent={field.value ?? ''}
                        onBlur={value => {
                            form.setFieldValue(name, value, true)
                            form.setFieldTouched(name, true)
                        }}
                        hasError={Boolean(meta.touched && meta.error)}
                    />
                )}
            </Component>
            <FormikError name={name} />
        </>
    )
}
