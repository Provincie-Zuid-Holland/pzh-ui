import { FastField, Field, FieldProps } from 'formik'

import { FormikError } from './FormikError'
import { FieldRadio, FieldRadioProps } from '../Form/FieldRadio'

type FormikRadioProps = FieldRadioProps & {
    name: string
    optimized?: boolean
}

export const FormikRadio = ({
    name,
    optimized = true,
    ...props
}: FormikRadioProps) => {
    const Component = optimized ? FastField : Field

    return (
        <>
            <Component name={name}>
                {({ field, form }: FieldProps<any>) => (
                    <FieldRadio
                        {...props}
                        {...field}
                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            form.setFieldValue(name, e.currentTarget.value)
                        }
                    />
                )}
            </Component>
            <FormikError name={name} />
        </>
    )
}
