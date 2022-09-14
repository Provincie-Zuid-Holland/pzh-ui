import { FastField, Field, FieldProps } from 'formik'

import { FormikError } from './FormikError'
import { FieldFileUpload, FieldFileUploadProps } from '../Form/FieldFileUpload'

type FormikFileUploadProps = Omit<FieldFileUploadProps, 'onChange'> & {
    optimized?: boolean
}

export function FormikFileUpload({
    name,
    optimized = true,
    ...props
}: FormikFileUploadProps) {
    const Component = optimized ? FastField : Field

    return (
        <>
            <Component name={name}>
                {({ field, form }: FieldProps<any>) => (
                    <FieldFileUpload
                        {...props}
                        {...field}
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
