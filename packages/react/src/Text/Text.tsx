import { ElementType } from 'react'

import { cn } from '../utils'
import { getTextStyles } from '../utils/getTextStyles'
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
    size?: 'xs' | 's' | 'm' | 'l'
    color?: `text-${string}`
    bold?: boolean
}

export const Text = <C extends PossibleTypes>({
    as,
    size = 'm',
    color = 'text-pzh-blue-900',
    bold,
    className,
    children,
    ...rest
}: PolymorphicComponentProp<C, TextProps>) => {
    const Component = as || ('p' as ElementType)
    const styles = getTextStyles(size)

    return (
        <Component
            className={cn(color, styles, className, {
                'font-bold': bold,
            })}
            {...rest}>
            {children}
        </Component>
    )
}
