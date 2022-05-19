import { ReactNode } from 'react'
import ReactSelect, { components, Props } from 'react-select'
import classNames from 'classnames'
import { AngleDown } from '@pzh-ui/icons'

import { FieldLabel } from '../FieldLabel'

/**
 * Form select element
 */

export interface FieldSelectProps extends Props {
    name: string
    label?: string
    description?: string | ReactNode
    required?: boolean
    disabled?: boolean
    hasError?: boolean
    testId?: string
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
    ...props
}: FieldSelectProps) {
    return (
        <>
            {label && (
                <FieldLabel
                    name={name}
                    label={label}
                    description={description}
                    required={required}
                />
            )}
            <div data-testid={testId}>
                <ReactSelect
                    isDisabled={disabled}
                    className={className}
                    name={name}
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                    components={{
                        Control: props => (
                            <components.Control
                                {...props}
                                className={classNames(
                                    'border-pzh-blue-dark border-opacity-35 bg-white hover:border-pzh-blue-dark hover:border-opacity-35',
                                    {
                                        'bg-pzh-gray-200 border-opacity-10':
                                            props.isDisabled,
                                        'border-pzh-red border-opacity-100':
                                            hasError,
                                    }
                                )}
                            />
                        ),
                        DropdownIndicator: () => (
                            <AngleDown className="text-pzh-blue-dark" />
                        ),
                        IndicatorSeparator: () => null,
                        Placeholder: props => (
                            <components.Placeholder
                                {...props}
                                className="text-pzh-blue-dark text-opacity-55 m-0 leading-none"
                            />
                        ),
                        Option: props => (
                            <components.Option
                                {...props}
                                className="text-pzh-blue-dark py-1 px-4 cursor-pointer hover:text-pzh-green hover:underline"
                            />
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
                                className="shadow-none focus:shadow-none"
                            />
                        ),
                    }}
                    styles={{
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
                            marginTop: 0,
                            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.10)',
                        }),
                        indicatorsContainer: (css, state) => ({
                            ...css,
                            width: 48,
                            justifyContent: 'center',
                            ...(state.isDisabled && {
                                opacity: 0.55,
                            }),
                        }),
                    }}
                    {...props}
                />
            </div>
        </>
    )
}
