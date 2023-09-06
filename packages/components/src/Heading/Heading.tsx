import classNames from 'classnames'
import { ReactNode } from 'react'

export interface HeadingProps {
    className?: string
    id?: string
    color?: string
    level?: '1' | '2' | '3' | '4' | '5' | '6'
    size?: 'xxxl' | 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs'
    children: ReactNode
}

export const Heading = ({
    className = '',
    id,
    color = 'text-pzh-blue',
    level = '1',
    size = 'xl',
    children,
}: HeadingProps) => {
    const styles = getHeadingStyles(size)

    const Component = `h${level}` as keyof JSX.IntrinsicElements

    return (
        <Component
            id={id}
            className={classNames('break-words hyphens-manual',styles,color, className)}>
            {children}
        </Component>
    )
}

export const getHeadingStyles = (
    size: HeadingProps['size'],
): string => {
    switch (size) {
        case 'xxxl':
            return 'text-[4rem] leading-[110%]'
        case 'xxl': 
            return 'text-[3rem] leading-[125%]'
        case 'xl':
            return 'text-[2.5rem] leading-[125%]'
        case 'l':
            return 'text-[2rem] leading-[125%]'
        case 'm':
            return 'text-[1.5rem] leading-[125%]'
        case 's':
            return 'text-[1.25rem] leading-[125%]'
        case 'xs':
            return 'text-[1.125rem] leading-[125%]'
        default: 
            return ''
    }
}
