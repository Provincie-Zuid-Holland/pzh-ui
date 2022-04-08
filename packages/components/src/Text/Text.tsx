import { ReactNode } from 'react'
import { useWindowSize } from 'react-use'

export interface TextProps {
    type?:
        | 'quote'
        | 'span'
        | 'subtitle'
        | 'introduction-paragraph'
        | 'body'
        | 'body-small'
    color?: string
    className?: string
    children: ReactNode
}

export const Text = ({
    type,
    children,
    color = 'text-pzh-blue-dark',
    className = '',
}: TextProps) => {
    const windowSize = useWindowSize()
    const styles = getStylesForElement(windowSize, type)

    if (type === 'quote') {
        return (
            <span
                data-testid="quote-span"
                style={styles}
                className={`${color} ${className}`}>
                {children}
            </span>
        )
    } else if (type === 'span') {
        return (
            <span style={styles} className={`${color} ${className}`}>
                {children}
            </span>
        )
    } else if (type === 'subtitle') {
        return (
            <p
                style={styles}
                className={`inline-block text-base leading-normal ${color} ${className}`}>
                {children}
            </p>
        )
    } else if (type === 'introduction-paragraph') {
        return (
            <p style={styles} className={`inline-block ${color} ${className}`}>
                {children}
            </p>
        )
    } else if (
        type === 'body' ||
        typeof type === 'undefined' ||
        type === 'body-small'
    ) {
        return (
            <p style={styles} className={`inline-block ${color} ${className}`}>
                {children}
            </p>
        )
    } else {
        throw new Error(`${type} is not a valid text type`)
    }
}

const getStylesForElement = (
    windowSize: { width: number; height: number },
    type?: string
) => {
    const smallScreen = 640
    const currentScreenIsMobile = windowSize.width <= smallScreen

    if (type === 'quote') {
        if (currentScreenIsMobile) {
            return {
                fontSize: '1.6rem',
                lineHeight: '1.094rem',
            }
        } else {
            return {
                fontSize: '1.667rem',
                lineHeight: '1.2rem',
            }
        }
    } else if (type === 'introduction-paragraph') {
        if (currentScreenIsMobile) {
            return {
                fontSize: '1.1rem',
                lineHeight: '1.25rem',
            }
        } else {
            return { fontSize: '1.2rem', lineHeight: '1.6rem' }
        }
    } else if (type === 'body' || type === 'span') {
        return {
            fontSize: '1rem',
            lineHeight: '1.5rem',
        }
    } else if (type === 'body-small') {
        return {
            fontSize: '0.8rem',
            lineHeight: '1rem',
        }
    }
}
