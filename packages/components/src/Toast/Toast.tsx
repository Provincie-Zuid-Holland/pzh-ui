import { Xmark } from '@pzh-ui/icons'
import classNames from 'classnames'
import {
    toast,
    ToastContainer as Container,
    ToastContainerProps as ContainerProps,
} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const contextClass = {
    success: '',
    error: '',
    info: '',
    warning: '',
    default: '',
    dark: '',
}

const contextIcon = {
    success: '',
    error: '',
    info: '',
    warning: '',
    default: '',
    dark: '',
}

export type ToastContainerProps = ContainerProps

export const ToastContainer = ({ ...props }: ToastContainerProps) => (
    <Container
        toastClassName={context =>
            classNames(
                contextClass[context?.type || 'default'],
                'relative mt-3 w-[320px] py-2 px-3 flex items-center rounded-[4px] shadow-card justify-between overflow-hidden cursor-pointer text-pzh-blue-dark'
            )
        }
        bodyClassName={() => 'flex items-center'}
        closeButton={() => <Xmark size={18} />}
        icon={() => <Xmark size={18} />}
        position="bottom-right"
        autoClose={false}
        {...props}
    />
)

export const toastNotification = toast
