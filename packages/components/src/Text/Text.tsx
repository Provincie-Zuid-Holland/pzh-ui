import classNames from 'classnames'
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

export interface TextProps {
    size?: 's' | 'm' | 'l'
}

export const Text = <C extends PossibleTypes>({
    as,
    size = 'm',
    className,
    children,
    ...rest
}: PolymorphicComponentProp<C, TextProps>) => {
    const Component = as || ('p' as ElementType)
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
