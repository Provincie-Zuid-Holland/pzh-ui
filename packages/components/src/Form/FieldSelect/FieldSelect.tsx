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
    layout?: 'default' | 'grid'
    tooltip?: string | JSX.Element
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
    styles,
    ...props
}: FieldSelectProps) {
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
                <ReactSelect
                    isDisabled={disabled}
                    className={className}
                    name={name}
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
                            <div className="mr-4">
                                <AngleDown className="text-pzh-blue-dark" />
                            </div>
                        ),
                        IndicatorSeparator: () => null,
                        Placeholder: props => (
                            <components.Placeholder
                                {...props}
                                className="text-pzh-blue-dark text-opacity-55 m-0 leading-none"
                            />
                        ),
                        // @ts-ignore
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
                                className="shadow-none focus:shadow-none pzh-select-input"
                            />
                        ),
                    }}
                    styles={{
                        ...styles,
                        ...{
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
                                marginTop: 0,
                                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.10)',
                            }),
                            indicatorsContainer: (css, state) => ({
                                ...css,
                                // width: 48,
                                justifyContent: 'center',
                                ...(state.isDisabled && {
                                    opacity: 0.55,
                                }),
                            }),
                        },
                    }}
                    {...props}
                />
            </div>
        </div>
    )
}
