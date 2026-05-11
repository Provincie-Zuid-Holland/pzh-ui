import { FastField, Field, FieldProps } from 'formik'

import { FieldRadioGroup, FieldRadioGroupProps } from '../Form/FieldRadioGroup'
import { FormikError } from './FormikError'

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
