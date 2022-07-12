import classNames from 'classnames'
import { CircleInfo, TriangleExclamation } from '@pzh-ui/icons'

export interface NotificationProps {
    variant?: 'info' | 'alert'
    size?: 'small' | 'normal'
    className?: string
    children: JSX.Element | string
}

export const Notification = ({
    variant = 'info',
    size = 'normal',
    className = '',
    children,
}: NotificationProps) => (
    <div
        className={classNames(
            'flex p-2 md:p-4 pb-1.5 md:pb-4',
            {
                'bg-pzh-blue-light bg-opacity-20': variant === 'info',
                'bg-pzh-yellow': variant === 'alert',
                'text-sm md:text-base': size === 'normal',
                'text-sm': size === 'small',
            },
            className
        )}>
        <div>
            {variant === 'alert' ? (
                <TriangleExclamation size={20} className="mt-[3px]" />
            ) : (
                <CircleInfo size={20} className="mt-[3px]" />
            )}
        </div>
        <p className="ml-2 md:ml-4 leading-[30px]">{children}</p>
    </div>
)
