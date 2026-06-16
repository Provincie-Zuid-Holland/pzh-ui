/**
 * Form label element
 */
import { ReactNode, useState } from 'react'

import { CircleInfo, CircleInfoSolid } from '@pzh-ui/icons'

import { Notification, NotificationProps } from '@pzh-ui/react'
import { Button } from '../../Button'
import { Tooltip } from '../../Tooltip'
import { cn } from '../../utils'

export interface FieldLabelProps {
    name: string
    label: string
    required?: boolean
    description?: string | ReactNode
    notification?: NotificationProps
    tooltip?: string | React.JSX.Element
    className?: string
    hasError?: boolean
}

export const FieldLabel = ({
    name,
    label,
    required,
    description,
    notification,
    tooltip,
    className,
    hasError,
}: FieldLabelProps) => {
    const [openNotification, setOpenNotification] = useState(false)

    const NotificationIcon = openNotification ? CircleInfoSolid : CircleInfo

    return (
        <div className={cn('mb-2', className)}>
            <div className="flex items-center">
                <label htmlFor={name} className="text-pzh-blue-500 font-bold">
                    {label}
                    {required && (
                        <span
                            className={cn('ml-1', {
                                'text-pzh-red-500': hasError,
                            })}>
                            *
                        </span>
                    )}
                </label>
                {notification && (
                    <Button
                        variant="default"
                        onPress={() => setOpenNotification(!openNotification)}>
                        <NotificationIcon
                            size={18}
                            className="text-pzh-blue-500 -mt-0.5 ml-1 cursor-pointer"
                        />
                    </Button>
                )}
                {tooltip && (
                    <Tooltip label={tooltip}>
                        <CircleInfo className="text-pzh-blue-500 -mt-1 ml-1 cursor-pointer" />
                    </Tooltip>
                )}
            </div>
            {description && <p className="text-s leading-5">{description}</p>}
            {notification && openNotification && (
                <Notification
                    className="mt-2"
                    onClose={() => setOpenNotification(false)}
                    {...notification}
                />
            )}
        </div>
    )
}
