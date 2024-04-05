import { ReactNode } from 'react'
import { cn } from '../utils'

export interface HeadingProps {
    className?: string
    id?: string
    color?: `text-${string}`
    level?: '1' | '2' | '3' | '4' | '5' | '6'
    size?: 'xxxl' | 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs'
    children: ReactNode
}

export const Heading = ({
    className = '',
    id,
    color = 'text-pzh-blue',
    level = '1',
    size = 'l',
    children,
}: HeadingProps) => {
    const styles = getHeadingStyles(size)

    const Component = `h${level}` as keyof JSX.IntrinsicElements

    return (
        <Component
            id={id}
            className={cn(
                'hyphens-manual break-words',
                styles,
                color,
                className
            )}>
            {children}
        </Component>
    )
}

export const getHeadingStyles = (size: HeadingProps['size']): string => {
    switch (size) {
        case 'xxxl':
            return 'text-heading-xxxl'
        case 'xxl':
            return 'text-heading-xxl'
        case 'xl':
            return 'text-heading-xl'
        case 'l':
            return 'text-heading-l'
        case 'm':
            return 'text-heading-m'
        case 's':
            return 'text-heading-s'
        case 'xs':
            return 'text-heading-xs'
        default:
            return ''
    }
}
