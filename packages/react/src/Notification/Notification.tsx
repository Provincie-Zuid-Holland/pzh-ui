import {
    Ban,
    CircleCheckSolid,
    CircleInfoSolid,
    TriangleExclamationSolid,
    XmarkLarge,
} from '@pzh-ui/icons'
import { ReactNode } from 'react'
import { Text } from '../Text'
import { cn } from '../utils'

type NotificationVariant = 'info' | 'warning' | 'positive' | 'negative'
type NotificationSize = 'm' | 's' | 'xs'

export interface NotificationProps {
    variant?: NotificationVariant
    size?: NotificationSize
    className?: string
    children?: ReactNode
    title: ReactNode
    onClose?: () => void
}

const variantConfig = {
    info: {
        icon: CircleInfoSolid,
        container: 'bg-pzh-blue-10 border-pzh-blue-100',
        body: 'text-pzh-blue-900',
    },
    warning: {
        icon: TriangleExclamationSolid,
        container: 'bg-pzh-yellow-10 border-pzh-yellow-100',
        body: 'text-pzh-gray-700',
    },
    positive: {
        icon: CircleCheckSolid,
        container: 'bg-pzh-green-10 border-pzh-green-100',
        body: 'text-pzh-green-900',
    },
    negative: {
        icon: Ban,
        container: 'bg-pzh-red-10 border-pzh-red-100',
        body: 'text-pzh-red-900',
    },
} satisfies Record<NotificationVariant, unknown>

const sizeConfig = {
    m: {
        padding: 'p-4',
        iconSize: 18,
        iconClass: 'min-w-[18px]',
        iconMargin: 'mt-1',
        titleClass: 'text-heading-s',
        bodySize: 's',
    },
    s: {
        padding: 'pl-4 pr-2 py-2',
        iconSize: 16,
        iconClass: 'min-w-4 mt-0.5',
        iconMargin: 'mt-0.5',
        titleClass: 'text-heading-xs',
        bodySize: 's',
    },
    xs: {
        padding: 'pl-2 pr-1 py-1',
        iconSize: 14,
        iconClass: 'min-w-3.5 mt-[3px]',
        iconMargin: 'mt-[3px]',
        titleClass: 'text-s -mt-0.5',
        bodySize: 'xs',
    },
} as const

export const Notification = ({
    variant = 'info',
    size = 'm',
    className,
    children,
    title,
    onClose,
}: NotificationProps) => {
    const { icon: Icon, container, body } = variantConfig[variant]

    const { padding, iconSize, iconClass, iconMargin, titleClass, bodySize } =
        sizeConfig[size]

    return (
        <div
            className={cn(
                'inline-block rounded border',
                container,
                padding,
                className
            )}>
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                    <Icon
                        size={iconSize}
                        className={cn(iconClass, iconMargin, body)}
                    />

                    <div
                        className={cn('flex flex-col', {
                            'gap-1': size !== 'xs',
                        })}>
                        <Text
                            as="span"
                            bold
                            className={cn('block', titleClass, body)}>
                            {title}
                        </Text>

                        {children && (
                            <Text size={bodySize} className={body}>
                                {children}
                            </Text>
                        )}
                    </div>
                </div>

                {onClose && (
                    <button
                        type="button"
                        aria-label="Sluiten"
                        onClick={onClose}
                        className={cn('cursor-pointer', iconMargin, body)}>
                        <XmarkLarge size={14} className="min-w-6" />
                    </button>
                )}
            </div>
        </div>
    )
}
