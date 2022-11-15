import { ReactNode, useRef } from 'react'
import classNames from 'classnames'
import { Spinner } from '@pzh-ui/icons'
import { AriaButtonProps, useButton } from 'react-aria'

/**
 * Primary UI component for user interaction
 */

export interface ButtonProps extends AriaButtonProps<'button'> {
    variant?: 'primary' | 'secondary' | 'cta'
    size?: 'large' | 'small'
    icon?: any
    isLoading?: boolean
    className?: string
    children?: ReactNode
}

export const Button = ({
    variant = 'primary',
    size = 'large',
    ...props
}: ButtonProps) => {
    const ref = useRef(null)
    const { buttonProps } = useButton(props, ref)
    const { children, isDisabled, isLoading, icon } = props

    const Icon = icon && isLoading ? Spinner : icon ? icon : null

    return (
        <button
            className={classNames(
                'pzh-button',
                {
                    'px-4 pt-[15px] pb-[12px] h-[48px]': size === 'large',
                    'text-xs px-[12px] pb-[9px] pt-[10px] h-[36px]':
                        size === 'small',
                    'bg-pzh-blue hover:bg-pzh-blue-dark text-white':
                        variant === 'primary' && !isDisabled,
                    'text-pzh-blue border border-pzh-blue-dark border-opacity-35 hover:border-opacity-100':
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
        </button>
    )
}
