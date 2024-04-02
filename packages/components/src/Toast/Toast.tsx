import classNames from 'clsx'
import {
    ToastContainer as Container,
    ToastContainerProps as ContainerProps,
    toast,
} from 'react-toastify'
import './style.css'

import {
    CircleCheck,
    CircleInfo,
    TriangleExclamation,
    Xmark,
} from '@pzh-ui/icons'

const contextClass = {
    success: 'bg-pzh-green',
    error: 'bg-pzh-red',
    info: 'bg-pzh-blue-light',
    warning: 'bg-pzh-orange',
    default: 'bg-pzh-green',
    dark: 'bg-pzh-green',
}

const contextIcon = {
    success: <CircleCheck size={20} className="text-pzh-green" />,
    error: <TriangleExclamation size={20} className="text-pzh-red" />,
    info: <CircleInfo size={20} className="text-pzh-blue-light" />,
    warning: <TriangleExclamation size={20} className="text-pzh-orange" />,
    default: <CircleCheck size={20} className="text-pzh-green" />,
    dark: <CircleCheck size={20} className="text-pzh-green" />,
}

export type ToastContainerProps = ContainerProps

export const ToastContainer = ({ ...props }: ToastContainerProps) => (
    <Container
        className="!w-max min-w-[320px] max-w-[400px]"
        toastClassName={() =>
            'relative mt-3 p-3 flex items-center rounded shadow-card justify-between overflow-hidden cursor-pointer bg-white text-pzh-blue-dark'
        }
        bodyClassName={() => 'pr-2 flex items-center leading-none'}
        closeButton={() => <Xmark size={18} />}
        progressClassName={context =>
            classNames(
                contextClass[context?.type || 'default'],
                'Toastify__progress-bar--animated absolute bottom-0 left-0 w-full h-1 origin-left'
            )
        }
        icon={context => (
            <div className="-mt-1">{contextIcon[context.type]}</div>
        )}
        position="bottom-right"
        draggable={false}
        limit={5}
        {...props}
    />
)

export const toastNotification = toast
