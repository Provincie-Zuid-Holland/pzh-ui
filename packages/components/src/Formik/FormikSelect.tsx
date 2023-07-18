import { FastField, Field, FieldProps } from 'formik'

import { FormikError } from './FormikError'
import { FieldSelect, FieldSelectProps } from '../Form/FieldSelect'

type FormikSelectProps = FieldSelectProps & {
    optimized?: boolean
}

export function FormikSelect({
    name,
    options,
    optimized = true,
    ...props
}: FormikSelectProps) {
    const Component = optimized ? FastField : Field

    return (
        <>
            <Component name={name}>
                {({ field, form, meta }: FieldProps<any>) => (
                    <FieldSelect
                        {...props}
                        {...field}
                        options={options}
                        value={
                            props.isMulti
                                ? field.value?.map((val: any) =>
                                      options?.find(
                                          (option: any) =>
                                              JSON.stringify(option.value) ===
                                              JSON.stringify(val)
                                      )
                                  )
                                : options?.find(
                                      (option: any) =>
                                          option.value === field.value
                                  )
                        }
                        onBlur={() => form.setFieldTouched(name, true)}
                        onChange={(item: any) => {
                            form.setFieldValue(
                                name,
                                props.isMulti
                                    ? item?.map((e: any) => e.value)
                                    : item?.value || null
                            )
                            props.onChange?.(
                                props.isMulti
                                    ? item?.map((e: any) => e.value)
                                    : item?.value,
                                {
                                    action: 'select-option',
                                    option: undefined,
                                }
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
