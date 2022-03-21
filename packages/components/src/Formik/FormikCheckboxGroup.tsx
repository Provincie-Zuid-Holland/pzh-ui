import { FastField, Field, FieldProps } from 'formik'

import { FormikError } from './FormikError'
import {
    FieldCheckboxGroup,
    FieldCheckboxGroupProps,
} from '../Form/FieldCheckboxGroup'

type FormikCheckboxGroupProps = Omit<
    FieldCheckboxGroupProps,
    'onChange' | 'value'
> & {
    optimized?: boolean
}

export const FormikCheckboxGroup = ({
    name,
    optimized = true,
    ...props
}: FormikCheckboxGroupProps) => {
    const Component = optimized ? FastField : Field

    return (
        <>
            <Component name={name}>
                {({ field, form }: FieldProps<any>) => (
                    <FieldCheckboxGroup
                        {...props}
                        {...field}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            const target = e.currentTarget
                            const newValue = [...field.value] || []
                            if (target.checked) {
                                newValue.push(target.value)
                            } else {
                                newValue.splice(
                                    newValue.findIndex(
                                        item => item === target.value
                                    ),
                                    1
                                )
                            }
                            form.setFieldValue(name, newValue)
                        }}
                    />
                )}
            </Component>
            <FormikError name={name} />
        </>
    )
}
