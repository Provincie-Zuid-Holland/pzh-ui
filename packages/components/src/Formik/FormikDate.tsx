import { FastField, Field, FieldProps } from 'formik'

import { FormikError } from './FormikError'
import { FieldDate, FieldDateProps } from '../Form/FieldDate'

type FormikDateProps = Omit<FieldDateProps, 'onChange'> & {
    name: string
    optimized?: boolean
}

export const FormikDate = ({
    name,
    optimized = true,
    ...props
}: FormikDateProps) => {
    const Component = optimized ? FastField : Field

    return (
        <>
            <Component name={name}>
                {({ field, form, meta }: FieldProps<any>) => (
                    <FieldDate
                        {...props}
                        {...field}
                        onClose={() => form.setFieldTouched(name, true)}
                        onChange={(date: Date | null) => {
                            form.setFieldValue(name, date?.toISOString())
                        }}
                        hasError={Boolean(meta.touched && meta.error)}
                    />
                )}
            </Component>

            <FormikError name={name} />
        </>
    )
}
