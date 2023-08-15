import { useRef } from 'react'
import { AriaDialogProps, useDialog } from 'react-aria'

interface DialogProps extends AriaDialogProps {
    children: React.ReactNode
    className?: string
}

export const Dialog = ({ children, className, ...props }: DialogProps) => {
    let ref = useRef(null)
    let { dialogProps } = useDialog(props, ref)

    return (
        <div {...dialogProps} className={className} ref={ref}>
            {children}
        </div>
    )
}
