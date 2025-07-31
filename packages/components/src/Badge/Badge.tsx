import { cn } from '../utils'

export interface BadgeProps {
    text: string
    variant?:
        | 'green'
        | 'yellow'
        | 'red'
        | 'gray'
        | 'lightGreen'
        | 'lightRed'
        | 'purple'
        | 'white'
        | 'blue'
    upperCase?: boolean
    solid?: boolean
    className?: string
}

const variantStyles: Record<
    NonNullable<BadgeProps['variant']>,
    { solid: string; outline: string }
> = {
    green: {
        solid: 'bg-pzh-green-500 border-pzh-green-500 text-pzh-white',
        outline: 'border-pzh-green-500 text-pzh-green-500',
    },
    lightGreen: {
        solid: 'bg-pzh-green-100 border-pzh-green-100 text-pzh-blue-500',
        outline: 'border-pzh-green-100 text-pzh-green-100',
    },
    yellow: {
        solid: 'bg-pzh-yellow-500 border-pzh-yellow-500 text-pzh-blue-500',
        outline: 'border-pzh-yellow-900 text-pzh-yellow-900',
    },
    red: {
        solid: 'bg-pzh-red-500 border-pzh-red-500 text-pzh-white',
        outline: 'border-pzh-red-500 text-pzh-red-500',
    },
    lightRed: {
        solid: 'bg-pzh-red-100 border-pzh-red-100 text-pzh-blue-500',
        outline: 'border-pzh-red-100 text-pzh-red-100',
    },
    gray: {
        solid: 'bg-pzh-gray-600 border-pzh-gray-600 text-pzh-white',
        outline: 'border-pzh-gray-600 text-pzh-gray-600',
    },
    purple: {
        solid: 'bg-pzh-purple-500 border-pzh-purple-500 text-pzh-white',
        outline: 'border-pzh-purple-500 text-pzh-purple-500',
    },
    white: {
        solid: 'bg-pzh-white border-pzh-white text-pzh-blue-500',
        outline: 'border-pzh-white text-pzh-white',
    },
    blue: {
        solid: 'bg-pzh-blue-500 border-pzh-blue-500 text-pzh-white',
        outline: 'border-pzh-blue-500 text-pzh-blue-500',
    },
}

export const Badge = ({
    text,
    variant = 'green',
    upperCase = true,
    solid = false,
    className = '',
}: BadgeProps) => {
    const style = variantStyles[variant][solid ? 'solid' : 'outline']

    return (
        <div
            className={cn(
                'text-s inline-block h-6 rounded border px-2 font-bold',
                upperCase && 'uppercase',
                style,
                className
            )}
            data-testid="badge">
            <span>{text}</span>
        </div>
    )
}
