import { ReactNode } from 'react'
import ReactSelect, {
    components,
    GroupBase,
    Props,
    StylesConfig,
} from 'react-select'
import AsyncReactSelect, { AsyncProps } from 'react-select/async'
import classNames from 'classnames'
import { AngleDown } from '@pzh-ui/icons'

import { FieldLabel } from '../FieldLabel'
import { Tag } from '../../Tag'
import { Text } from '../../Text'

type Option = { label: string; value: string }

type SelectProps = Props &
    Pick<
        AsyncProps<unknown, boolean, GroupBase<unknown>>,
        'defaultOptions' | 'cacheOptions' | 'loadOptions' | 'isLoading'
    >

/**
 * Form select element
 */

export interface FieldSelectProps extends SelectProps {
    name: string
    label?: string
    description?: string | ReactNode
    required?: boolean
    disabled?: boolean
    hasError?: boolean
    testId?: string
    layout?: 'default' | 'grid'
    tooltip?: string | JSX.Element
    isAsync?: boolean
}

export function FieldSelect({
    name,
    disabled,
    label,
    required,
    description,
    className,
    hasError,
    testId,
    layout = 'default',
    tooltip,
    isAsync,
    components: providedComponents,
    styles: providedStyles,
    ...props
}: FieldSelectProps) {
    const Select = isAsync ? AsyncReactSelect : ReactSelect

    return (
        <div
            className={classNames({
                'grid grid-cols-6 md:gap-8 gap-2': layout === 'grid',
            })}>
            {label && (
                <FieldLabel
                    name={name}
                    label={label}
                    description={description}
                    required={required}
                    tooltip={tooltip}
                    className={classNames({
                        'md:col-span-2 col-span-6 mb-0 mt-2': layout === 'grid',
                    })}
                />
            )}
            <div
                data-testid={testId}
                className={classNames('relative', {
                    'md:col-span-4 col-span-6': layout === 'grid',
                })}>
                <Select
                    isDisabled={disabled}
                    className={className}
                    name={name}
                    components={{
                        Control: props => (
                            <components.Control
                                {...props}
                                className={classNames(
                                    'border-pzh-gray-600 bg-white hover:border-pzh-blue-dark',
                                    {
                                        'border-pzh-red': hasError,
                                        'bg-pzh-gray-200': props.isDisabled,
                                        'ring ring-2 ring-pzh-blue border-pzh-blue':
                                            props.isFocused,
                                    }
                                )}
                            />
                        ),
                        ValueContainer: props => (
                            <components.ValueContainer
                                {...props}
                                className="h-[48px] !py-0 !flex-nowrap !overflow-x-auto whitespace-nowrap"
                            />
                        ),
                        DropdownIndicator: () => (
                            <div className="mr-4">
                                <AngleDown className="text-pzh-blue-dark" />
                            </div>
                        ),
                        IndicatorSeparator: () => null,
                        Placeholder: props => (
                            <components.Placeholder
                                {...props}
                                className="text-pzh-gray-600 m-0 leading-none"
                            />
                        ),
                        Option: props => (
                            <components.Option
                                {...props}
                                className="text-pzh-blue-dark py-1 px-4 cursor-pointer hover:text-pzh-green hover:underline">
                                {props.isMulti ? (
                                    <div className="flex items-center">
                                        <input
                                            className="absolute -left-[9999px] pzh-form-checkbox"
                                            checked={props.isSelected}
                                            onChange={() => null}
                                            type="checkbox"
                                        />
                                        <span className="relative pl-[34px] cursor-pointer inline-block text-pzh-blue-dark leading-[28px] font-normal">
                                            {props.label}
                                        </span>
                                    </div>
                                ) : (
                                    props.label
                                )}
                            </components.Option>
                        ),
                        SingleValue: props => (
                            <components.SingleValue
                                {...props}
                                className="text-pzh-blue-dark"
                            />
                        ),
                        Input: props => (
                            <components.Input
                                {...props}
                                className="shadow-none focus:shadow-none pzh-select-input"
                            />
                        ),
                        MultiValue: props => (
                            <Tag
                                text={props.children as string}
                                className="mr-1"
                                onClick={() =>
                                    props.setValue(
                                        props
                                            .getValue()
                                            .filter(
                                                option =>
                                                    (option as Option).value !==
                                                    (props.data as Option).value
                                            ),
                                        'deselect-option'
                                    )
                                }
                            />
                        ),
                        GroupHeading: props => (
                            <components.GroupHeading {...props}>
                                <Text type="body-bold" className="normal-case">
                                    {props.children}
                                </Text>
                            </components.GroupHeading>
                        ),
                        ...providedComponents,
                    }}
                    styles={{ ...getSelectStyles(), ...providedStyles }}
                    {...props}
                />
            </div>
        </div>
    )
}

export const getSelectStyles = () =>
    ({
        control: ({
            backgroundColor,
            border,
            borderColor,
            boxShadow,
            ...css
        }) => ({
            ...css,
            '&:hover': {},
        }),
        input: css => ({
            ...css,
            margin: 0,
            padding: 0,
            lineHeight: 1,
        }),
        singleValue: ({ color, ...css }, state) => ({
            ...css,
            margin: 0,
            lineHeight: 1,
            ...(state.isDisabled && {
                opacity: 0.55,
            }),
        }),
        valueContainer: css => ({
            ...css,
            paddingTop: 15,
            paddingBottom: 11,
            paddingInline: 15,
        }),
        option: (_, state) => ({
            fontWeight: state.isSelected ? 700 : 400,
            '&:active': {
                fontWeight: state.isSelected ? 700 : 400,
            },
        }),
        menu: css => ({
            ...css,
            zIndex: 9999,
            marginTop: 2,
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.10)',
        }),
        indicatorsContainer: (css, state) => ({
            ...css,
            justifyContent: 'center',
            ...(state.isDisabled && {
                opacity: 0.55,
            }),
        }),
        multiValue: css => ({
            ...css,
        }),
    } as StylesConfig<unknown, boolean, GroupBase<unknown>>)
