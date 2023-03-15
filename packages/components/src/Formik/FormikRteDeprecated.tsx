import { FastField, Field, FieldProps } from 'formik'

import { FormikError } from './FormikError'
import { FieldRteDeprecated, FieldRteProps } from '../Form/FieldRteDeprecated'

type FormikRteDeprecatedProps = FieldRteProps & {
    name: string
    optimized?: boolean
}

export const FormikRteDeprecated = ({
    name,
    optimized = true,
    ...props
}: FormikRteDeprecatedProps) => {
    const Component = optimized ? FastField : Field

    return (
        <>
            <Component name={name}>
                {({ field, form }: FieldProps<any>) => (
                    <FieldRteDeprecated
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
