import { FastField, Field, FieldProps } from 'formik'

import { FormikError } from './FormikError'
import { FieldTextArea, FieldTextAreaProps } from '../Form/FieldTextArea'

type FormikTextAreaProps = FieldTextAreaProps & {
    name: string
    optimized?: boolean
}

export const FormikTextArea = ({
    name,
    optimized = true,
    ...props
}: FormikTextAreaProps) => {
    const Component = optimized ? FastField : Field

    return (
        <>
            <Component name={name}>
                {({ field, meta }: FieldProps<any>) => (
                    <FieldTextArea
                        {...props}
                        {...field}
                        value={field.value ?? ''}
                        hasError={Boolean(meta.touched && meta.error)}
                    />
                )}
            </Component>
            <FormikError name={name} />
        </>
    )
}
