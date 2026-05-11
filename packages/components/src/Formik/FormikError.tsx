import { getIn, useFormikContext } from 'formik'
import { ReactNode } from 'react'

interface FormikErrorProps {
    name: string
    renderAction?: (message: string) => ReactNode
}

export const FormikError = ({ name, renderAction }: FormikErrorProps) => {
    const { errors, touched, submitCount } = useFormikContext<any>()

    const error = getIn(errors, name)
    const isTouched = getIn(touched, name)

    if (!error || (!isTouched && submitCount === 0)) return null

    const message = String(error)

    return (
        <span
            className="text-pzh-red-500 text-s mt-1 block"
            id={`error-${name}`}>
            {message}
            {renderAction?.(message)}
        </span>
    )
}
