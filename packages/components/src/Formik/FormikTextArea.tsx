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
                {({ field }: FieldProps<any>) => (
                    <FieldTextArea
                        {...props}
                        {...field}
                        value={field.value ?? ''}
                    />
                )}
            </Component>
            <FormikError name={name} />
        </>
    )
}
