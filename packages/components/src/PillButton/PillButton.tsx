import { Slot } from '@radix-ui/react-slot'
import { ReactNode, useRef } from 'react'
import { AriaButtonProps, useButton } from 'react-aria'
import { cn } from '../utils'

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
            className={cn(
                'focus:ring-pzh-focus text-s flex h-6 items-center rounded-full border px-4 ring-offset-2 transition focus:outline-none focus:ring',
                {
                    'text-pzh-green-500 border-pzh-green-500 hover:bg-pzh-green-900 hover:border-pzh-green-900 hover:text-pzh-white cursor-pointer':
                        !isDisabled,
                    'bg-pzh-gray-200 text-pzh-blue-900/35 cursor-not-allowed':
                        isDisabled,
                },
                props.className
            )}
            ref={ref}
            {...buttonProps}>
            {Icon && <Icon size={12} className="mr-2" />}
            <span>{children}</span>
        </Component>
    )
}
