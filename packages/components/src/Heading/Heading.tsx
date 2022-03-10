import { CSSProperties, FC } from 'react'
import { useMedia } from 'react-use'

export interface HeadingProps {
    className?: string
    id?: string
    color?: string
    level?: '1' | '2' | '3' | '4' | '5' | '6'
    customStyles?: any
}

export const Heading: FC<HeadingProps> = ({
    className = '',
    id,
    color = 'text-pzh-blue',
    level = '1',
    children,
    customStyles,
}) => {
    const isMobile = useMedia('(max-width: 640px)')
    const styles = getHeadingStyles(level, isMobile)

    const Component = `h${level}` as keyof JSX.IntrinsicElements

    return (
        <Component
            style={customStyles || styles}
            id={id}
            className={`break-words ${color} ${className}`}>
            {children}
        </Component>
    )
}

export const getHeadingStyles = (
    level?: '1' | '2' | '3' | '4' | '5' | '6',
    isMobile?: boolean
): CSSProperties => {
    if (level === '1') {
        if (isMobile) {
            return {
                hyphens: 'manual',
                fontSize: '1.6rem',
                lineHeight: '1.75rem',
            }
        } else {
            return {
                hyphens: 'manual',
                fontSize: '2.4rem',
                lineHeight: '2.8rem',
            }
        }
    } else if (level === '2') {
        if (isMobile) {
            return {
                hyphens: 'manual',
                fontSize: '1.2rem',
                lineHeight: '1.6rem',
            }
        } else {
            return {
                hyphens: 'manual',
                fontSize: '1.8rem',
                lineHeight: '2.2rem',
            }
        }
    } else if (level === '3') {
        if (isMobile) {
            return {
                hyphens: 'manual',
                fontSize: '1.1rem',
                lineHeight: '1.5rem',
            }
        } else {
            return {
                hyphens: 'manual',
                fontSize: '1.2rem',
                lineHeight: '1.6rem',
            }
        }
    } else {
        // No custom styles yet for heading 4, 5 and 6
        return {}
    }
}
