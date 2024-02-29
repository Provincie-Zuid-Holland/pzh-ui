import classNames from 'clsx'
import { ElementType } from 'react'

import { PolymorphicComponentProp } from '../utils/polymorphicComponent'

type PossibleTypes =
    | 'p'
    | 'span'
    | 'b'
    | 'strong'
    | 'i'
    | 'em'
    | 'mark'
    | 'small'
    | 'del'
    | 'ins'
    | 'sub'
    | 'sup'
    | 'blockquote'
    | 'code'
    | 'pre'
    | 'li'
    | 'dt'
    | 'dd'
    | 'label'

export interface TextProps {
    size?: 's' | 'm' | 'l'
    color?: `text-${string}`
    bold?: boolean
}

export const Text = <C extends PossibleTypes>({
    as,
    size = 'm',
    color = 'text-pzh-blue-dark',
    bold,
    className,
    children,
    ...rest
}: PolymorphicComponentProp<C, TextProps>) => {
    const Component = as || ('p' as ElementType)
    const styles = getTextStyles(size)

    return (
        <Component
            className={classNames(color, styles, className, {
                'font-bold': bold,
            })}
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
