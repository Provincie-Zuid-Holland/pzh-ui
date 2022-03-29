import classNames from 'classnames'
import {
    faCircleInfo,
    faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
        <FontAwesomeIcon
            icon={variant === 'alert' ? faTriangleExclamation : faCircleInfo}
            style={{ marginTop: 3 }}
        />
        <p className="ml-2 md:ml-4 leading-[30px]">{text}</p>
    </div>
)
