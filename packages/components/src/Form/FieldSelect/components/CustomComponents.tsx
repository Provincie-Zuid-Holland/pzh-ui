import { AngleDown, Xmark } from '@pzh-ui/icons'
import classNames from 'clsx'
import type {
    ClearIndicatorProps,
    GroupHeadingProps,
    OptionProps,
} from 'react-select'
import { components } from 'react-select'
import { Button } from '../../../Button'
import { cn } from '../../../utils'
import { Option } from '../FieldSelect'

export const CustomComponents = ({ name }: { name: string }) => ({
    DropdownIndicator: () => (
        <div className="mr-2">
            <AngleDown className="text-pzh-blue-500 cursor-pointer" />
        </div>
    ),
    IndicatorSeparator: null,
    Option: (props: OptionProps<Option, boolean>) => (
        <components.Option
            {...props}
            className={cn(
                'active:bg-pzh-blue-100 text-pzh-gray-600 min-h-12 px-4 py-2',
                {
                    'hover:bg-pzh-blue-10 cursor-pointer hover:no-underline':
                        !props.isDisabled,
                    'bg-pzh-gray-200': props.isDisabled,
                    'bg-pzh-blue-10': props.isFocused,
                    'bg-pzh-blue-10 text-pzh-blue-900': props.isSelected,
                }
            )}>
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
                            'relative inline-block pl-[34px] leading-7'
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
            <p className="text-m text-pzh-blue-500 font-bold normal-case">
                {props.children}
            </p>
        </components.GroupHeading>
    ),
    ClearIndicator: (props: ClearIndicatorProps<Option, boolean>) => (
        <Button
            variant="default"
            onPress={props.clearValue}
            className="text-pzh-blue-500 mr-2 cursor-pointer"
            tabIndex={0}>
            <span className="sr-only">Veld leegmaken</span>
            <Xmark size={14} />
        </Button>
    ),
})
