import classNames from 'classnames'
import { ElementType, ReactNode } from 'react'

import { PolymorphicComponentProp } from '../types/polymorphicComponent'

export interface TextProps {
    size?: 's' | 'm' | 'l'
    children?: ReactNode
}

export const Text = <C extends ElementType>({
    as,
    size,
    className,
    children,
    ...rest
}: PolymorphicComponentProp<C, TextProps>) => {
    const Component = as || 'p'
    const styles = getTextStyles(size)

    return (
        <Component
            className={classNames('text-pzh-blue-dark', styles, className)}
            {...rest}>
            {children}
        </Component>
    )
}

export const getTextStyles = (size: TextProps['size']): string => {
    switch (size) {
        case 'l':
            return 'text-l'
        case 'm':
            return 'text-m'
        case 's':
            return 'text-s'
        default:
            return ''
    }
}
