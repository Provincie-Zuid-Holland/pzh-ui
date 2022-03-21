import { FastField, Field, FieldProps } from 'formik'

import { FormikError } from './FormikError'
import { FieldDate, FieldDateProps } from '../Form/FieldDate'

type FormikDateProps = Omit<FieldDateProps, 'value'> & {
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
                {({ field, form }: FieldProps<any>) => (
                    <FieldDate
                        {...props}
                        {...field}
                        onClose={() => form.setFieldTouched(name, true)}
                        onChange={(date: Date) => {
                            form.setFieldValue(name, date)
                        }}
                    />
                )}
            </Component>

            <FormikError name={name} />
        </>
    )
}
