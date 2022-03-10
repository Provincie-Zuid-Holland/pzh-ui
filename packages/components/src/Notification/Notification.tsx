import classNames from 'classnames'
import {
    faInfoCircle,
    faExclamationTriangle,
} from '@fortawesome/pro-light-svg-icons'
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
            icon={variant === 'alert' ? faExclamationTriangle : faInfoCircle}
            style={{ marginTop: 3 }}
        />
        <span className="ml-2 md:ml-4">{text}</span>
    </div>
)
