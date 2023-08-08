import { ElementType, ReactNode, useRef } from 'react'
import classNames from 'classnames'
import { AriaButtonProps, useButton } from 'react-aria'
import { Link } from 'react-router-dom'

/**
 * Primary UI component for user interaction
 */

export interface PillButtonProps<T extends ElementType>
    extends AriaButtonProps<'button'> {
    as?: T
    icon?: any
    className?: string
    children?: ReactNode
}

export const PillButton = <T extends ElementType = 'button'>({
    as,
    ...props
}: PillButtonProps<T>) => {
    const ref = useRef(null)
    const { buttonProps } = useButton({ ...props, elementType: as }, ref)
    const { children, isDisabled, icon } = props

    const Component = as === 'a' ? Link : as || 'button'

    const Icon = icon

    return (
        <Component
            {...(as === 'a' && {
                to: props.href,
            })}
            className={classNames('flex items-center h-[24px] px-3 border text-[16px] rounded-[40px] focus:outline-none focus:ring focus:ring-pzh-blue-dark ring-offset-2 transition',
                {
                    'text-pzh-green border-pzh-green cursor-pointer hover:bg-pzh-green hover:text-pzh-white': !isDisabled,
                    'text-pzh-gray bg-pzh-gray-200 text-pzh-blue-dark/35 cursor-not-allowed': isDisabled,
                },
                props.className
            )}
            ref={ref}
            {...buttonProps}>
            {Icon && <Icon size={12} className="mr-[8px]" />}
            <span className='-mb-0.5'>{children}</span>
        </Component>
    )
}
