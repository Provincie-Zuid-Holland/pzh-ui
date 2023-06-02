import { ElementType, ReactNode, useRef } from 'react'
import classNames from 'classnames'
import { Spinner } from '@pzh-ui/icons'
import { AriaButtonProps, useButton } from 'react-aria'
import { Link } from 'react-router-dom'

/**
 * Primary UI component for user interaction
 */

export interface ButtonProps<T extends ElementType>
    extends AriaButtonProps<'button'> {
    as?: T
    variant?: 'primary' | 'secondary' | 'cta' | 'link'
    size?: 'large' | 'small'
    icon?: any
    isLoading?: boolean
    className?: string
    children?: ReactNode
}

export const Button = <T extends ElementType = 'button'>({
    as,
    variant = 'primary',
    size = 'large',
    ...props
}: ButtonProps<T>) => {
    const ref = useRef(null)
    const { buttonProps } = useButton({ ...props, elementType: as }, ref)
    const { children, isDisabled, isLoading, icon } = props

    const Component = as === 'a' ? Link : as || 'button'

    const Icon = icon && isLoading ? Spinner : icon ? icon : null

    return (
        <Component
            {...(as === 'a' && {
                to: props.href,
            })}
            className={classNames(
                'pzh-button',
                {
                    'pt-[15px] pb-[12px] h-[48px]': size === 'large',
                    'px-4': size === 'large' && variant !== 'link',
                    'text-xs pb-[9px] pt-[10px] h-[36px]': size === 'small',
                    'px-[12px]': size === 'small' && variant !== 'link',
                    'underline font-normal': variant === 'link',
                    'font-bold': variant !== 'link',
                    'bg-pzh-blue hover:bg-pzh-blue-dark text-white':
                        variant === 'primary' && !isDisabled,
                    'text-pzh-blue border border-pzh-gray-600 hover:border-pzh-blue':
                        variant === 'secondary' && !isDisabled,
                    'bg-pzh-green hover:bg-pzh-green-dark text-white':
                        variant === 'cta' && !isDisabled,
                    'cursor-pointer': !isDisabled,
                },
                props.className
            )}
            ref={ref}
            {...buttonProps}>
            {Icon ? (
                <div className="flex items-center">
                    <Icon
                        className={classNames({
                            '-mt-[2px]': variant !== 'secondary',
                            '-mt-0.5': variant === 'secondary',
                            'mr-2': size === 'large',
                            'mr-[8px]': size === 'small',
                            'animate-spin': isLoading,
                        })}
                    />
                    <span>{children}</span>
                </div>
            ) : isLoading ? (
                <div className="flex items-center">
                    <Spinner
                        className={classNames('animate-spin', {
                            '-mt-[2px]': variant !== 'secondary',
                            '-mt-0.5': variant === 'secondary',
                            'mr-2': size === 'large',
                            'mr-[8px]': size === 'small',
                        })}
                    />
                    <span>{children}</span>
                </div>
            ) : (
                children
            )}
        </Component>
    )
}
