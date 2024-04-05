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
    upperCase?: boolean
    solid?: boolean
    className?: string
}

export const Badge = ({
    text,
    variant = 'green',
    upperCase = true,
    solid = false,
    className = '',
}: BadgeProps) => (
    <div
        className={cn(
            'text-s inline-block h-6 rounded border px-2 pt-px font-bold',
            {
                uppercase: upperCase,
                'border-pzh-green text-pzh-green':
                    variant === 'green' && !solid,
                'bg-pzh-green border-pzh-green text-pzh-white':
                    variant === 'green' && solid,
                'border-pzh-green-light text-pzh-green-light':
                    variant === 'lightGreen' && !solid,
                'bg-pzh-green-light border-pzh-green-light text-pzh-blue':
                    variant === 'lightGreen' && solid,
                'border-pzh-yellow-dark text-pzh-yellow-dark':
                    variant === 'yellow' && !solid,
                'bg-pzh-yellow border-pzh-yellow text-pzh-blue':
                    variant === 'yellow' && solid,
                'border-pzh-red text-pzh-red': variant === 'red' && !solid,
                'bg-pzh-red border-pzh-red text-pzh-white':
                    variant === 'red' && solid,
                'border-pzh-red-light text-pzh-red-light':
                    variant === 'lightRed' && !solid,
                'bg-pzh-red-light border-pzh-red-light text-pzh-blue':
                    variant === 'lightRed' && solid,
                'border-pzh-cool-gray-dark text-pzh-cool-gray-dark':
                    variant === 'gray' && !solid,
                'bg-pzh-cool-gray-dark border-pzh-cool-gray-dark text-pzh-white':
                    variant === 'gray' && solid,
                'border-pzh-purple text-pzh-purple':
                    variant === 'purple' && !solid,
                'bg-pzh-purple border-pzh-purple text-pzh-white':
                    variant === 'purple' && solid,
                'border-pzh-white text-pzh-white':
                    variant === 'white' && !solid,
                'bg-pzh-white border-pzh-white text-pzh-blue':
                    variant === 'white' && solid,
            },
            className
        )}
        data-testid="badge">
        <span>{text}</span>
    </div>
)
