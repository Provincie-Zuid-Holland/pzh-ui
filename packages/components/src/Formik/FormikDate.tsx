import { FastField, Field, FieldProps } from 'formik'

import { zonedTimeToUtc } from 'date-fns-tz'
import { FieldDate, FieldDateProps } from '../Form/FieldDate'
import { formatDate } from '../utils'
import { FormikError } from './FormikError'

type FormikDateProps = Omit<FieldDateProps, 'onChange'> & {
    name: string
    optimized?: boolean
}

export const FormikDate = ({
    name,
    optimized = true,
    ...props
}: FormikDateProps) => {
    const Component = optimized ? FastField : Field

    return (
        <>
            <Component name={name}>
                {({ field, form, meta }: FieldProps<any>) => (
                    <FieldDate
                        {...props}
                        {...field}
                        onClose={() => form.setFieldTouched(name, true)}
                        onChange={(date: Date | null) => {
                            form.setFieldValue(
                                name,
                                date
                                    ? formatDate(
                                          zonedTimeToUtc(
                                              new Date(date),
                                              'Europe/Amsterdam'
                                          ),
                                          'yyyy-MM-dd'
                                      )
                                    : null
                            )
                        }}
                        hasError={Boolean(meta.touched && meta.error)}
                    />
                )}
            </Component>

            <FormikError name={name} />
        </>
    )
}
