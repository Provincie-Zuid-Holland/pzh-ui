import { FastField, Field, FieldProps } from 'formik'

import { FormikError } from './FormikError'
import { FieldFileUpload, FieldFileUploadProps } from '../Form/FieldFileUpload'

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
                {({ field, form }: FieldProps<any>) => (
                    <FieldFileUpload
                        {...props}
                        {...field}
                        onChange={onChange ? onChange : item => {
                            form.setFieldValue(name, item)
                        }}
                    />
                )}
            </Component>
            <FormikError name={name} />
        </>
    )
}
