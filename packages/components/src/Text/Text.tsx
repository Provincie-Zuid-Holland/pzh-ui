import classNames from 'classnames'
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
        | 'body-bold'
    color?: string
    className?: string
    id?: string
    children: ReactNode
}

export const Text = ({
    type,
    children,
    color = 'text-pzh-blue-dark',
    className = '',
    id,
}: TextProps) => {
    const windowSize = useWindowSize()
    const styles = getStylesForElement(windowSize, type)

    switch (type) {
        case 'quote':
            return (
                <span
                    id={id}
                    data-testid="quote-span"
                    style={styles}
                    className={`${color} ${className}`}>
                    {children}
                </span>
            )
        case 'span':
            return (
                <span
                    id={id}
                    style={styles}
                    className={`${color} ${className}`}>
                    {children}
                </span>
            )
        case 'subtitle':
            return (
                <p
                    id={id}
                    style={styles}
                    className={classNames(
                        'text-base leading-normal',
                        color,
                        {
                            'inline-block': !className,
                        },
                        className
                    )}>
                    {children}
                </p>
            )
        case 'introduction-paragraph':
            return (
                <p
                    id={id}
                    style={styles}
                    className={classNames(
                        color,
                        {
                            'inline-block': !className,
                        },
                        className
                    )}>
                    {children}
                </p>
            )
        case 'body-bold':
            return (
                <p
                    id={id}
                    style={styles}
                    className={classNames(
                        'font-bold',
                        color,
                        {
                            'inline-block': !className,
                        },
                        className
                    )}>
                    {children}
                </p>
            )
        case 'body':
        case 'body-small':
        default:
            return (
                <p
                    id={id}
                    style={styles}
                    className={classNames(
                        color,
                        {
                            'inline-block': !className,
                        },
                        className
                    )}>
                    {children}
                </p>
            )
    }
}

const getStylesForElement = (
    windowSize: { width: number; height: number },
    type?: string
) => {
    const smallScreen = 640
    const currentScreenIsMobile = windowSize.width <= smallScreen

    switch (type) {
        case 'quote':
            if (currentScreenIsMobile) {
                return {
                    fontSize: '1.6rem',
                    lineHeight: '1.094rem',
                }
            }

            return {
                fontSize: '1.667rem',
                lineHeight: '1.2rem',
            }
        case 'introduction-paragraph':
            if (currentScreenIsMobile) {
                return {
                    fontSize: '1.1rem',
                    lineHeight: '1.25rem',
                }
            }

            return { fontSize: '1.2rem', lineHeight: '1.6rem' }
        case 'body-small':
            return {
                fontSize: '0.8rem',
                lineHeight: '1rem',
            }
        case 'body':
        case 'span':
        default:
            return {
                fontSize: '1rem',
                lineHeight: '1.5rem',
            }
    }
}
