import { FastField, Field, FieldProps } from 'formik'

import { FieldTextArea, FieldTextAreaProps } from '../Form/FieldTextArea'
import { FormikError } from './FormikError'

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
                {({ field, form, meta }: FieldProps<any>) => (
                    <FieldTextArea
                        {...props}
                        {...field}
                        value={field.value ?? ''}
                        hasError={Boolean(
                            meta.error && (meta.touched || form.submitCount > 0)
                        )}
                    />
                )}
            </Component>
            <FormikError name={name} />
        </>
    )
}
