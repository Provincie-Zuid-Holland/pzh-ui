import { FastField, Field, FieldProps } from 'formik'

import { FieldFileUpload, FieldFileUploadProps } from '../Form/FieldFileUpload'
import { FormikError } from './FormikError'

type FormikFileUploadProps = Partial<FieldFileUploadProps> & {
    name: string
    optimized?: boolean
}

export function FormikFileUpload({
    name,
    optimized = true,
    ...props
}: FormikFileUploadProps) {
    const Component = optimized ? FastField : Field
    const { onChange } = props

    return (
        <>
            <Component name={name}>
                {({ field, form, meta }: FieldProps<any>) => (
                    <FieldFileUpload
                        {...props}
                        {...field}
                        onChange={
                            onChange
                                ? onChange
                                : item => {
                                      form.setFieldValue(name, item)
                                  }
                        }
                        hasError={Boolean(meta.touched && meta.error)}
                    />
                )}
            </Component>
            <FormikError name={name} />
        </>
    )
}
