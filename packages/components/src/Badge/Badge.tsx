import classNames from 'classnames'

export interface BadgeProps {
    text: string
    variant?: 'green' | 'yellow' | 'red' | 'gray'
    className?: string
}

export const Badge = ({
    text,
    variant = 'green',
    className = '',
}: BadgeProps) => (
    <div
        className={classNames(
            'inline-block border rounded px-1.5 text-[16px] h-[28px] font-bold uppercase',
            {
                'border-pzh-green text-pzh-green': variant === 'green',
                'border-pzh-yellow-dark text-pzh-yellow-dark':
                    variant === 'yellow',
                'border-pzh-red text-pzh-red': variant === 'red',
                'border-pzh-cool-gray text-pzh-cool-gray': variant === 'gray',
            },
            className
        )}
        data-testid="badge">
        <span>{text}</span>
    </div>
)
