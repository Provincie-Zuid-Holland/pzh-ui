import { FastField, Field, FieldProps } from 'formik'

import { FormikError } from './FormikError'
import { FieldRadioGroup, FieldRadioGroupProps } from '../Form/FieldRadioGroup'

type FormikRadioGroupProps = Omit<
    FieldRadioGroupProps,
    'onChange' | 'value'
> & {
    optimized?: boolean
}

export const FormikRadioGroup = ({
    name,
    optimized = true,
    ...props
}: FormikRadioGroupProps) => {
    const Component = optimized ? FastField : Field

    return (
        <>
            <Component name={name}>
                {({ field, form, meta }: FieldProps<any>) => (
                    <FieldRadioGroup
                        {...props}
                        {...field}
                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            form.setFieldValue(name, e.currentTarget.value)
                        }
                        hasError={Boolean(meta.touched && meta.error)}
                    />
                )}
            </Component>

            <FormikError name={name} />
        </>
    )
}
