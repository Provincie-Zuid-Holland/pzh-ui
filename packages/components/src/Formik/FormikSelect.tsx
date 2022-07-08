import { FastField, Field, FieldProps } from 'formik'

import { FormikError } from './FormikError'
import { FieldSelect, FieldSelectProps } from '../Form/FieldSelect'

type FormikSelectProps = FieldSelectProps & {
    optimized?: boolean
}

export function FormikSelect({
    name,
    options,
    optimized = true,
    ...props
}: FormikSelectProps) {
    const Component = optimized ? FastField : Field

    return (
        <>
            <Component name={name}>
                {({ field, form, meta }: FieldProps<any>) => (
                    <FieldSelect
                        {...props}
                        {...field}
                        options={options}
                        value={options?.find(
                            (option: any) => option.value === field.value
                        )}
                        onBlur={() => form.setFieldTouched(name, true)}
                        onChange={(item: any) => {
                            form.setFieldValue(name, item?.value || '')
                        }}
                        hasError={Boolean(meta.touched && meta.error)}
                    />
                )}
            </Component>
            <FormikError name={name} />
        </>
    )
}
