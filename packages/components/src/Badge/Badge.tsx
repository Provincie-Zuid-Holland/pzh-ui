import classNames from 'classnames'

export interface BadgeProps {
    text: string
    variant?: 'green' | 'orange' | 'red' | 'gray'
    className?: string
}

export const Badge = ({
    text,
    variant = 'green',
    className = '',
}: BadgeProps) => (
    <div
        className={classNames(
            'inline-block border rounded px-1.5 text-[16px] h-[28px] bold uppercase',
            {
                'border-pzh-badge-green text-pzh-badge-green':
                    variant === 'green',
                'border-pzh-badge-orange text-pzh-badge-orange':
                    variant === 'orange',
                'border-pzh-badge-red text-pzh-badge-red': variant === 'red',
                'border-pzh-cool-gray text-pzh-cool-gray': variant === 'gray',
            },
            className
        )}
        data-testid="badge">
        <span>{text}</span>
    </div>
)
