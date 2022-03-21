import { FastField, Field, FieldProps } from 'formik'

import { FormikError } from './FormikError'
import { FieldSelect, FieldSelectProps } from '../Form/FieldSelect'

type FormikSelectProps = FieldSelectProps & {
    optimized?: boolean
}

export function FormikSelect({
    name,
    optimized = true,
    ...props
}: FormikSelectProps) {
    const Component = optimized ? FastField : Field

    return (
        <>
            <Component name={name}>
                {({ field, form }: FieldProps<any>) => (
                    <FieldSelect
                        {...props}
                        {...field}
                        onBlur={() => form.setFieldTouched(name, true)}
                        onChange={item => {
                            form.setFieldValue(name, item)
                        }}
                    />
                )}
            </Component>
            <FormikError name={name} />
        </>
    )
}
