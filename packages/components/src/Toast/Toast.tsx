import classNames from 'clsx'
import {
    ToastContainer as Container,
    ToastContainerProps as ContainerProps,
    toast,
} from 'react-toastify'

import {
    CircleCheck,
    CircleInfo,
    TriangleExclamation,
    Xmark,
} from '@pzh-ui/icons'

const contextClass = {
    success: 'bg-pzh-green-500',
    error: 'bg-pzh-red-500',
    info: 'bg-pzh-blue-100',
    warning: 'bg-pzh-orange-500',
    default: 'bg-pzh-green-500',
    dark: 'bg-pzh-green-500',
}

const contextIcon = {
    success: <CircleCheck size={20} className="text-pzh-green-500" />,
    error: <TriangleExclamation size={20} className="text-pzh-red-500" />,
    info: <CircleInfo size={20} className="text-pzh-blue-100" />,
    warning: <TriangleExclamation size={20} className="text-pzh-orange-500" />,
    default: <CircleCheck size={20} className="text-pzh-green-500" />,
    dark: <CircleCheck size={20} className="text-pzh-green-500" />,
}

export type ToastContainerProps = ContainerProps

export const ToastContainer = ({ ...props }: ToastContainerProps) => (
    <Container
        toastClassName={() =>
            'relative w-full min-w-[320px] max-w-[400px] text-left mt-3 p-3 flex items-center rounded shadow-card overflow-hidden cursor-pointer bg-pzh-white text-pzh-blue-900'
        }
        closeButton={({ closeToast }) => (
            <Xmark size={18} className="ml-auto" onClick={closeToast} />
        )}
        progressClassName={context =>
            classNames(
                contextClass[context?.type || 'default'],
                'Toastify__progress-bar--animated absolute bottom-0 left-0 w-full h-1 origin-left'
            )
        }
        icon={context => contextIcon[context.type]}
        position="bottom-right"
        draggable={false}
        limit={5}
        {...props}
    />
)

export const toastNotification = toast
