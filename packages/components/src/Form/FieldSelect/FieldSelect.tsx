import ReactSelect, { components, Props } from 'react-select'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { FieldLabel } from '../FieldLabel'

/**
 * Form select element
 */

export interface FieldSelectProps extends Props {
    name: string
    label?: string
    description?: string
    required?: boolean
    disabled?: boolean
    hasError?: boolean
}

export function FieldSelect({
    name,
    disabled,
    label,
    required,
    description,
    className,
    hasError,
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
            <ReactSelect
                isDisabled={disabled}
                className={className}
                name={name}
                menuPortalTarget={
                    document.getElementById(`${name}-menu`) as HTMLElement
                }
                menuPlacement="auto"
                components={{
                    Control: props => (
                        <components.Control
                            {...props}
                            className={classNames(
                                'border-pzh-blue-dark border-opacity-35 bg-white hover:border-pzh-blue-dark hover:border-opacity-35',
                                {
                                    'bg-pzh-gray border-opacity-10':
                                        props.isDisabled,
                                    'border-pzh-red border-opacity-100':
                                        hasError,
                                }
                            )}
                        />
                    ),
                    DropdownIndicator: () => (
                        <FontAwesomeIcon
                            className="text-pzh-blue-dark"
                            icon={faAngleDown}
                        />
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
            <div id={`${name}-menu`} />
        </>
    )
}
