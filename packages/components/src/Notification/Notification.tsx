import classNames from 'classnames'

import {
    Ban,
    CircleCheck,
    CircleInfo,
    TriangleExclamation,
} from '@pzh-ui/icons'
import { getHeadingStyles } from '../Heading'
import { Text } from '../Text'

export interface NotificationProps {
    variant?: 'info' | 'warning' | 'positive' | 'negative'
    className?: string
    children: JSX.Element | string
    title?: string
    icon?: any
}

export const Notification = ({
    variant = 'info',
    className = '',
    children,
    title,
    icon,
}: NotificationProps) => {
    const Icon =
        icon || variant === 'warning'
            ? TriangleExclamation
            : variant === 'positive'
            ? CircleCheck
            : variant === 'negative'
            ? Ban
            : CircleInfo

    const colors = {
        container: classNames({
            'bg-pzh-blue-10 border-pzh-blue-100': variant === 'info',
            'bg-pzh-yellow-10 border-pzh-yellow-100': variant === 'warning',
            'bg-pzh-green-10 border-pzh-green-100': variant === 'positive',
            'bg-pzh-red-10 border-pzh-red-100': variant === 'negative',
        }),
        body: classNames({
            'text-pzh-blue-900': variant === 'info',
            'text-pzh-gray-700': variant === 'warning',
            'text-pzh-green-900': variant === 'positive',
            'text-pzh-red-900': variant === 'negative',
        }),
    }

    return (
        <div
            className={classNames(
                'inline-block rounded border px-4 py-3',
                colors.container,
                className
            )}>
            <div className="flex">
                <Icon size={18} className={classNames('mt-px', colors.body)} />
                <div className="ml-2">
                    {title && (
                        <Text
                            as="span"
                            bold
                            className={classNames(
                                'mb-2 block',
                                getHeadingStyles('s'),
                                colors.body
                            )}>
                            {title}
                        </Text>
                    )}
                    <Text size="s" className={colors.body}>
                        {children}
                    </Text>
                </div>
            </div>
        </div>
    )
}
