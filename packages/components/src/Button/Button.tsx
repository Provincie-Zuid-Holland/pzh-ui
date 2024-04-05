import { Slot, Slottable } from '@radix-ui/react-slot'
import classNames from 'clsx'
import { forwardRef } from 'react'
import { AriaButtonProps, useButton } from 'react-aria'

import { Spinner } from '@pzh-ui/icons'
import { useObjectRef } from '@react-aria/utils'
import { cn } from '../utils'

/**
 * Primary UI component for user interaction
 */

export interface ButtonProps extends AriaButtonProps {
    /** Variant of the button */
    variant?: 'primary' | 'secondary' | 'cta' | 'link' | 'default'
    /** Size of the button */
    size?: 'large' | 'small'
    /** Option to provide an icon component inside the button */
    icon?: any
    /** Size of provided icon */
    iconSize?: number
    /** Wether the button has a loading state */
    isLoading?: boolean
    /** Custom classNames */
    className?: string
    /** Can be used to render a Next.js link for example */
    asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            asChild = false,
            variant = 'primary',
            size = 'large',
            iconSize = 14,
            ...props
        },
        forwardedRef
    ) => {
        const ref = useObjectRef(forwardedRef)
        const { buttonProps } = useButton({ ...props }, ref)
        const { children, isDisabled, isLoading, icon } = props

        const Component = asChild ? Slot : 'button'

        const Icon = icon && isLoading ? Spinner : icon ? icon : null

        return (
            <Component
                {...buttonProps}
                className={cn(
                    variant !== 'default' && {
                        'pzh-button': true,
                        'h-12 pb-3 pt-[15px]': size === 'large',
                        'px-4': size === 'large' && variant !== 'link',
                        'text-s h-10 pb-[9px] pt-[10px]': size === 'small',
                        'px-3': size === 'small' && variant !== 'link',
                        'font-normal underline': variant === 'link',
                        'font-bold': variant !== 'link',
                        'bg-pzh-blue hover:bg-pzh-blue-dark text-white':
                            variant === 'primary' && !isDisabled,
                        'bg-pzh-white text-pzh-blue border-pzh-gray-600 hover:border-pzh-blue border':
                            variant === 'secondary' && !isDisabled,
                        'bg-pzh-green hover:bg-pzh-green-dark text-white':
                            variant === 'cta' && !isDisabled,
                        'cursor-pointer': !isDisabled,
                    },
                    {
                        'inline-flex items-center': !!Icon || !!isLoading,
                    },
                    props.className
                )}
                ref={ref}>
                {Icon ? (
                    <Icon
                        size={iconSize}
                        className={classNames('-mt-0.5', {
                            'mr-2': !!children,
                            'animate-spin': isLoading,
                        })}
                    />
                ) : isLoading ? (
                    <Spinner className="-mt-0.5 mr-2 animate-spin" />
                ) : null}
                <Slottable>{children}</Slottable>
            </Component>
        )
    }
)
