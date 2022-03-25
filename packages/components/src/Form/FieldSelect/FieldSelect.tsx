import ReactSelect, { components, Props } from 'react-select'
import { faAngleDown } from '@fortawesome/pro-regular-svg-icons'
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
    classes?: string
}

export function FieldSelect({
    name,
    disabled,
    label,
    required,
    description,
    classes,
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
                className={classes}
                name={name}
                components={{
                    Control: props => (
                        <components.Control
                            {...props}
                            className={classNames(
                                'border-pzh-blue-dark border-opacity-35 bg-white hover:border-pzh-blue-dark hover:border-opacity-35',
                                {
                                    'bg-pzh-gray border-opacity-10':
                                        props.isDisabled,
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
                        zIndex: 2,
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
                        boxShadow: 'none',
                        filter: 'drop-shadow(0px 24px 80px rgba(0, 0, 0, 0.07)) drop-shadow(0px 7.2353px 24.1177px rgba(0, 0, 0, 0.0456112)) drop-shadow(0px 3.00517px 10.0172px rgba(0, 0, 0, 0.035)) drop-shadow(0px 1.08691px 3.62304px rgba(0, 0, 0, 0.0243888))',
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
        </>
    )
}
