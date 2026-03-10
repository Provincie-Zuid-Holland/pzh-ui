import { FastField, Field, FieldProps } from 'formik'
import { ReactNode } from 'react'

import { FieldRte, FieldRteProps } from '../Form/FieldRte'
import { FormikError } from './FormikError'

type FormikRteProps = FieldRteProps & {
    name: string
    optimized?: boolean
    renderErrorAction?: (message: string) => ReactNode
}

export const FormikRte = ({
    name,
    optimized = true,
    renderErrorAction,
    ...props
}: FormikRteProps) => {
    const Component = optimized ? FastField : Field

    return (
        <>
            <Component name={name}>
                {({ field, form, meta }: FieldProps<any>) => (
                    <FieldRte
                        {...props}
                        {...field}
                        initialContent={field.value ?? ''}
                        onBlur={async value => {
                            await form.setFieldValue(name, value)
                            form.setFieldTouched(name, true)
                        }}
                        hasError={Boolean(meta.touched && meta.error)}
                    />
                )}
            </Component>
            <FormikError name={name} renderAction={renderErrorAction} />
        </>
    )
}
