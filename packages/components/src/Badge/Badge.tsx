import classNames from 'classnames'

export interface BadgeProps {
    text: string
    variant?: 'green' | 'yellow' | 'red' | 'gray' | 'lightGreen' | 'lightRed'
    upperCase?: boolean
    className?: string
}

export const Badge = ({
    text,
    variant = 'green',
    upperCase = true,
    className = '',
}: BadgeProps) => (
    <div
        className={classNames(
            'inline-block border rounded px-1.5 text-[16px] h-[28px] font-bold',
            {
                uppercase: upperCase,
                'border-pzh-green text-pzh-green': variant === 'green',
                'border-pzh-green-light text-pzh-green-light':
                    variant === 'lightGreen',
                'border-pzh-yellow-dark text-pzh-yellow-dark':
                    variant === 'yellow',
                'border-pzh-red text-pzh-red': variant === 'red',
                'border-pzh-red-light text-pzh-red-light':
                    variant === 'lightRed',
                'border-pzh-cool-gray text-pzh-cool-gray': variant === 'gray',
            },
            className
        )}
        data-testid="badge">
        <span>{text}</span>
    </div>
)
