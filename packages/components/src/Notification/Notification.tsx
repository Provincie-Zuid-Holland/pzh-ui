import classNames from 'classnames'
import { CircleInfo, TriangleExclamation } from '@pzh-ui/icons'

export interface NotificationProps {
    variant?: 'info' | 'alert'
    size?: 'small' | 'normal'
    className?: string
    children: JSX.Element | string
    icon?: any
}

export const Notification = ({
    variant = 'info',
    size = 'normal',
    className = '',
    children,
    icon: Icon,
}: NotificationProps) => (
    <div
        className={classNames(
            'flex px-4 pt-3 pb-2',
            {
                'bg-pzh-blue-light bg-opacity-20': variant === 'info',
                'bg-pzh-yellow': variant === 'alert',
                'text-sm md:text-base': size === 'normal',
                'text-sm': size === 'small',
            },
            className
        )}>
        <div>
            {Icon ? (
                <Icon size={20} className="mt-[3px]" />
            ) : variant === 'alert' ? (
                <TriangleExclamation size={20} className="mt-[3px]" />
            ) : (
                <CircleInfo size={20} className="mt-[3px]" />
            )}
        </div>
        <p
            className={classNames('ml-2 md:ml-4', {
                'leading-[30px]': size === 'normal',
            })}>
            {children}
        </p>
    </div>
)
