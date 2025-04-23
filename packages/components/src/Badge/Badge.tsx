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
            'text-s inline-block h-6 rounded border px-2 font-bold',
            {
                uppercase: upperCase,
                'border-pzh-green-500 text-pzh-green-500':
                    variant === 'green' && !solid,
                'bg-pzh-green-500 border-pzh-green-500 text-pzh-white':
                    variant === 'green' && solid,
                'border-pzh-green-100 text-pzh-green-100':
                    variant === 'lightGreen' && !solid,
                'bg-pzh-green-100 border-pzh-green-100 text-pzh-blue-500':
                    variant === 'lightGreen' && solid,
                'border-pzh-yellow-900 text-pzh-yellow-900':
                    variant === 'yellow' && !solid,
                'bg-pzh-yellow-500 border-pzh-yellow-500 text-pzh-blue-500':
                    variant === 'yellow' && solid,
                'border-pzh-red-500 text-pzh-red-500':
                    variant === 'red' && !solid,
                'bg-pzh-red-500 border-pzh-red-500 text-pzh-white':
                    variant === 'red' && solid,
                'border-pzh-red-100 text-pzh-red-100':
                    variant === 'lightRed' && !solid,
                'bg-pzh-red-100 border-pzh-red-100 text-pzh-blue-500':
                    variant === 'lightRed' && solid,
                'border-pzh-gray-600 text-pzh-gray-600':
                    variant === 'gray' && !solid,
                'bg-pzh-gray-600 border-pzh-gray-600 text-pzh-white':
                    variant === 'gray' && solid,
                'border-pzh-purple-500 text-pzh-purple-500':
                    variant === 'purple' && !solid,
                'bg-pzh-purple-500 border-pzh-purple-500 text-pzh-white':
                    variant === 'purple' && solid,
                'border-pzh-white text-pzh-white':
                    variant === 'white' && !solid,
                'bg-pzh-white border-pzh-white text-pzh-blue-500':
                    variant === 'white' && solid,
            },
            className
        )}
        data-testid="badge">
        <span>{text}</span>
    </div>
)
