import { FastField, Field, FieldProps } from 'formik'
import { FieldSelect, FieldSelectProps, Option } from '../Form/FieldSelect'
import { FormikError } from './FormikError'

type FormikSelectProps = FieldSelectProps & {
    optimized?: boolean
}

export function FormikSelect<T extends unknown>({
    name,
    options,
    optimized = true,
    ...props
}: FormikSelectProps) {
    const Component = optimized ? FastField : Field

    return (
        <>
            <Component name={name}>
                {({ field, form, meta }: FieldProps<T>) => {
                    // Determine the select value
                    const selectValue = props.isMulti
                        ? Array.isArray(field.value)
                            ? (field.value
                                  .map(val =>
                                      (options as Option[] | undefined)?.find(
                                          (opt: Option) =>
                                              JSON.stringify(opt.value) ===
                                              JSON.stringify(val)
                                      )
                                  )
                                  .filter(Boolean) as Option[])
                            : []
                        : (options as Option[] | undefined)?.find(
                              opt => opt.value === field.value
                          ) || null

                    return (
                        <FieldSelect
                            {...props}
                            {...field}
                            options={options}
                            value={selectValue}
                            onBlur={() =>
                                setTimeout(
                                    () => form.setFieldTouched(name, true),
                                    1
                                )
                            }
                            onChange={(newValue, actionMeta) => {
                                const selected = newValue as
                                    | Option
                                    | Option[]
                                    | null

                                if (props.isMulti) {
                                    form.setFieldValue(
                                        name,
                                        Array.isArray(selected)
                                            ? selected.map(item =>
                                                  'value' in item
                                                      ? item.value
                                                      : item
                                              )
                                            : []
                                    )
                                } else {
                                    form.setFieldValue(
                                        name,
                                        selected && 'value' in selected
                                            ? selected.value
                                            : null
                                    )
                                }

                                props.onChange?.(selected, actionMeta)
                            }}
                            hasError={Boolean(meta.touched && meta.error)}
                        />
                    )
                }}
            </Component>
            <FormikError name={name} />
        </>
    )
}
