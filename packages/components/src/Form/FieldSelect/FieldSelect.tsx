import { AngleDown, Xmark } from '@pzh-ui/icons'
import classNames from 'clsx'
import { KeyboardEventHandler, ReactNode, useState } from 'react'
import ReactSelect, {
    GroupBase,
    Props,
    StylesConfig,
    components,
} from 'react-select'
import AsyncReactSelect, { AsyncProps } from 'react-select/async'
import CreatableSelect from 'react-select/creatable'

import { FieldLabel } from '../FieldLabel'

type SelectProps = Props &
    Pick<
        AsyncProps<unknown, boolean, GroupBase<unknown>>,
        'defaultOptions' | 'cacheOptions' | 'loadOptions' | 'isLoading'
    >

interface Option {
    readonly label: string
    readonly value: string
}

const createOption = (label: string) => ({
    label,
    value: label,
})

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
    isCreatable?: boolean
}

export function FieldSelect({
    name,
    disabled,
    label,
    required,
    description,
    className,
    hasError,
    testId = name,
    layout = 'default',
    tooltip,
    isAsync,
    isCreatable,
    components: providedComponents,
    styles: providedStyles,
    ...props
}: FieldSelectProps) {
    const Select = isAsync
        ? AsyncReactSelect
        : isCreatable
        ? CreatableSelect
        : ReactSelect

    const [inputValue, setInputValue] = useState('')
    const [value, setValue] = useState<readonly Option[]>(
        Array.isArray(props.value) ? props.value : []
    )

    const handleKeyDown: KeyboardEventHandler = event => {
        if (!inputValue) return
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                if (value.find(val => val.value === inputValue)) return

                setValue(prev => {
                    const newVal = [...prev, createOption(inputValue)]

                    props.onChange?.(newVal, {
                        action: 'create-option',
                        option: undefined,
                    })

                    return newVal
                })
                setInputValue('')
                event.preventDefault()
        }
    }

    if (isCreatable) {
        props.isMulti = true
        props.onKeyDown = handleKeyDown
        props.onInputChange = setInputValue
        props.value = value
        props.inputValue = inputValue
    }

    return (
        <div
            className={classNames({
                'grid grid-cols-6 gap-2 md:gap-8': layout === 'grid',
            })}>
            {label && (
                <FieldLabel
                    name={name}
                    label={label}
                    description={description}
                    required={required}
                    tooltip={tooltip}
                    className={classNames({
                        'col-span-6 mb-0 mt-2 md:col-span-2': layout === 'grid',
                    })}
                />
            )}
            <div
                data-testid={testId}
                className={classNames('relative', {
                    'col-span-6 md:col-span-4': layout === 'grid',
                })}>
                <Select
                    isDisabled={disabled}
                    className={className}
                    inputId={name}
                    components={{
                        DropdownIndicator: () => (
                            <div className="mr-2">
                                <AngleDown className="text-pzh-blue-900" />
                            </div>
                        ),
                        IndicatorSeparator: null,
                        Option: props => (
                            <components.Option
                                {...props}
                                className={classNames('px-4 py-1', {
                                    'text-pzh-blue-900 hover:text-pzh-green-500 cursor-pointer hover:underline':
                                        !props.isDisabled,
                                    'text-pzh-gray-500': props.isDisabled,
                                    underline: props.isFocused,
                                })}>
                                {props.isMulti ? (
                                    <div
                                        className="flex items-center"
                                        data-testid={`${name}-option`}>
                                        <input
                                            className="pzh-form-checkbox absolute -left-[9999px]"
                                            checked={props.isSelected}
                                            onChange={() => null}
                                            type="checkbox"
                                        />
                                        <span
                                            className={classNames(
                                                'text-pzh-blue-900 relative inline-block cursor-pointer pl-[34px] font-normal leading-7',
                                                {
                                                    'before:ring-pzh-focus before:border-pzh-blue-500 before:outline-none before:ring-2':
                                                        props.isFocused,
                                                }
                                            )}>
                                            {props.label}
                                        </span>
                                    </div>
                                ) : (
                                    <span data-testid={`${name}-option`}>
                                        {props.label}
                                    </span>
                                )}
                            </components.Option>
                        ),
                        GroupHeading: props => (
                            <components.GroupHeading {...props}>
                                <p className="text-m font-bold normal-case">
                                    {props.children}
                                </p>
                            </components.GroupHeading>
                        ),
                        ClearIndicator: props => (
                            <components.ClearIndicator {...props}>
                                <button
                                    type="button"
                                    onClick={props.clearValue}>
                                    <span className="sr-only">
                                        Veld leegmaken
                                    </span>
                                    <Xmark size={14} />
                                </button>
                            </components.ClearIndicator>
                        ),
                        ...providedComponents,
                    }}
                    classNames={{
                        control: state =>
                            classNames(
                                'border-pzh-gray-600 hover:border-pzh-blue-900',
                                {
                                    'bg-pzh-white': !disabled,
                                    'border-pzh-red-500': hasError,
                                    'bg-pzh-gray-200': disabled,
                                    'ring-pzh-focus border-pzh-blue-500 ring-2':
                                        state.isFocused,
                                }
                            ),
                        singleValue: () => 'text-pzh-blue-900',
                        placeholder: () => 'text-pzh-gray-600 m-0 leading-none',
                        valueContainer: () => 'gap-2 flex-wrap py-2',
                        multiValue: () =>
                            'border-pzh-blue-500 text-pzh-blue-500 focus:ring-pzh-focus inline-flex gap-2 h-8 items-center rounded border px-2 ring-offset-2 focus:outline-none focus:ring-2 hover:bg-pzh-blue-500 transition duration-150 hover:text-pzh-white',
                        multiValueLabel: () => '-mb-px',
                    }}
                    styles={{ ...getSelectStyles(), ...providedStyles }}
                    {...props}
                    onChange={newValue => {
                        setValue(newValue as Option[])
                        props.onChange?.(newValue, {
                            action: 'select-option',
                            option: undefined,
                        })
                    }}
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
            '> input': {
                boxShadow: 'none !important',
            },
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
            paddingBlock: 8,
            paddingInline: 16,
            minHeight: 48,
            whiteSpace: 'nowrap',
            overflowX: 'auto',
        }),
        option: (_, state) => ({
            fontFamily:
                state.isSelected || state.isFocused
                    ? 'Karbon Medium'
                    : 'Karbon Regular',
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
            paddingRight: 8,
            ...(state.isDisabled && {
                opacity: 0.55,
            }),
        }),
        multiValue: () => ({}),
        multiValueLabel: () => ({}),
        multiValueRemove: () => ({}),
    } as StylesConfig<unknown, boolean, GroupBase<unknown>>)
