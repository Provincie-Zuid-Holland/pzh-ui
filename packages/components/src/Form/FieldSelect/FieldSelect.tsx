import classNames from 'clsx'
import { ReactNode, useMemo } from 'react'
import ReactSelect, { GroupBase, Props } from 'react-select'
import AsyncReactSelect, { AsyncProps } from 'react-select/async'
import CreatableSelect from 'react-select/creatable'

import { FieldLabel } from '../FieldLabel'
import { CustomComponents } from './components/CustomComponents'
import { useCreatableHandlers } from './hooks/useCreatableHandlers'
import { getSelectStyles } from './styles/selectStyles'

export interface Option {
    readonly label: string
    readonly value: string
    readonly isDisabled?: boolean
}

type SelectProps = Props<Option, boolean, GroupBase<Option>> &
    Pick<
        AsyncProps<Option, boolean, GroupBase<Option>>,
        'defaultOptions' | 'cacheOptions' | 'loadOptions' | 'isLoading'
    >

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
    components,
    styles,
    tabSelectsValue = false,
    ...props
}: FieldSelectProps) {
    const SelectComponent = useMemo(() => {
        if (isAsync) return AsyncReactSelect
        if (isCreatable) return CreatableSelect
        return ReactSelect
    }, [isAsync, isCreatable])

    const { creatableProps, handleChange } = useCreatableHandlers({
        isCreatable,
        onChange: props.onChange,
        initialValue: props.value,
    })

    const selectProps: SelectProps = {
        ...props,
        ...creatableProps,
        isDisabled: disabled,
        inputId: name,
        components: {
            ...CustomComponents({ name }),
            ...components,
        },
        className,
        classNames: {
            control: state =>
                classNames('border-pzh-gray-600 hover:border-pzh-blue-900', {
                    'bg-pzh-white': !disabled,
                    'border-pzh-red-500': hasError,
                    'bg-pzh-gray-200': disabled,
                    'ring-pzh-focus border-pzh-blue-500 ring-2':
                        state.isFocused,
                }),
            singleValue: () => 'text-pzh-blue-900',
            placeholder: () => 'text-pzh-gray-600 m-0 leading-none',
            valueContainer: () => 'gap-2 flex-wrap py-2',
            multiValue: () =>
                'border-pzh-blue-500 text-pzh-blue-500 focus:ring-pzh-focus inline-flex gap-2 h-8 items-center rounded border px-2 ring-offset-2 focus:outline-none focus:ring-2 hover:bg-pzh-blue-500 transition duration-150 hover:text-pzh-white',
            multiValueLabel: () => '-mb-px',
        },
        styles: { ...getSelectStyles(), ...styles },
        onChange: handleChange,
        'aria-invalid': hasError,
        tabSelectsValue,
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
                        'col-span-6 mt-2 mb-0 md:col-span-2': layout === 'grid',
                    })}
                />
            )}
            <div
                data-testid={testId}
                className={classNames('relative', {
                    'col-span-6 md:col-span-4': layout === 'grid',
                })}>
                <SelectComponent {...selectProps} />
            </div>
        </div>
    )
}
