import classNames from 'classnames'
import { CircleInfo, TriangleExclamation } from '@pzh-ui/icons'

export interface NotificationProps {
    text: string
    variant?: 'info' | 'alert'
    className?: string
}

export const Notification = ({
    text,
    variant = 'info',
    className = '',
}: NotificationProps) => (
    <div
        className={classNames(
            'flex p-2 md:p-4 pb-1.5 md:pb-4 text-sm md:text-base',
            {
                'bg-pzh-blue-light bg-opacity-20': variant === 'info',
                'bg-pzh-yellow': variant === 'alert',
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
        <p className="ml-2 md:ml-4 leading-[30px]">{text}</p>
    </div>
)
