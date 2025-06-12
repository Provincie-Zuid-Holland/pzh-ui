import { AngleDown, Xmark } from '@pzh-ui/icons'
import classNames from 'clsx'
import type {
    ClearIndicatorProps,
    GroupHeadingProps,
    OptionProps,
} from 'react-select'
import { components } from 'react-select'

interface Option {
    label: string
    value: string
}

export const CustomComponents = ({ name }: { name: string }) => ({
    DropdownIndicator: () => (
        <div className="mr-2">
            <AngleDown className="text-pzh-blue-900" />
        </div>
    ),
    IndicatorSeparator: null,
    Option: (props: OptionProps<Option, boolean>) => (
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
                            'text-pzh-blue-900 relative inline-block cursor-pointer pl-[34px] leading-7 font-normal',
                            {
                                'before:ring-pzh-focus before:border-pzh-blue-500 before:ring-2 before:outline-none':
                                    props.isFocused,
                            }
                        )}>
                        {props.label}
                    </span>
                </div>
            ) : (
                <span data-testid={`${name}-option`}>{props.label}</span>
            )}
        </components.Option>
    ),
    GroupHeading: (props: GroupHeadingProps<Option, boolean>) => (
        <components.GroupHeading {...props}>
            <p className="text-m font-bold normal-case">{props.children}</p>
        </components.GroupHeading>
    ),
    ClearIndicator: (props: ClearIndicatorProps<Option, boolean>) => (
        <components.ClearIndicator {...props}>
            <button type="button" onClick={props.clearValue}>
                <span className="sr-only">Veld leegmaken</span>
                <Xmark size={14} />
            </button>
        </components.ClearIndicator>
    ),
})
