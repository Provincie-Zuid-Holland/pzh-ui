import { Slot } from '@radix-ui/react-slot'
import classNames from 'clsx'
import { ReactNode, useRef } from 'react'
import { AriaButtonProps, useButton } from 'react-aria'

/**
 * Primary UI component for user interaction
 */

export interface PillButtonProps extends AriaButtonProps {
    icon?: any
    className?: string
    children?: ReactNode
    asChild?: boolean
}

export const PillButton = ({ asChild, ...props }: PillButtonProps) => {
    const ref = useRef(null)
    const { buttonProps } = useButton({ ...props }, ref)
    const { children, isDisabled, icon } = props

    const Component = asChild ? Slot : 'button'

    const Icon = icon

    return (
        <Component
            className={classNames(
                'focus:ring-pzh-focus text-s flex h-6 items-center rounded-full border px-4 ring-offset-2 transition focus:outline-none focus:ring',
                {
                    'text-pzh-green border-pzh-green hover:bg-pzh-green-dark hover:border-pzh-green-dark hover:text-pzh-white cursor-pointer':
                        !isDisabled,
                    'text-pzh-gray bg-pzh-gray-200 text-pzh-blue-dark/35 cursor-not-allowed':
                        isDisabled,
                },
                props.className
            )}
            ref={ref}
            {...buttonProps}>
            {Icon && <Icon size={12} className="mr-2" />}
            <span className="-mb-[3px]">{children}</span>
        </Component>
    )
}
