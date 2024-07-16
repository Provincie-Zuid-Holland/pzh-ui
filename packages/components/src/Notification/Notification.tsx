import {
    Ban,
    CircleCheck,
    CircleInfo,
    TriangleExclamation,
} from '@pzh-ui/icons'
import classNames from 'clsx'

import { getHeadingStyles } from '../Heading'
import { Text } from '../Text'
import { cn } from '../utils'

export interface NotificationProps {
    variant?: 'info' | 'warning' | 'positive' | 'negative'
    className?: string
    children?: JSX.Element | string
    title?: JSX.Element | string
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
            className={cn(
                'inline-block rounded border px-4 py-3',
                colors.container,
                className
            )}>
            <div className="flex">
                <div className="mt-px min-w-[18px]">
                    <Icon size={18} className={colors.body} />
                </div>
                <div className="ml-2">
                    {title && (
                        <Text
                            as="span"
                            bold
                            className={classNames(
                                'block',
                                getHeadingStyles('s'),
                                colors.body,
                                {
                                    'mb-2': !!children,
                                }
                            )}>
                            {title}
                        </Text>
                    )}
                    {children && (
                        <Text size="s" className={colors.body}>
                            {children}
                        </Text>
                    )}
                </div>
            </div>
        </div>
    )
}
