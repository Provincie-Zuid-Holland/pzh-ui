import { ErrorMessage } from 'formik'
import { ReactNode } from 'react'

interface FormikErrorProps {
    name: string
    renderAction?: (message: string) => ReactNode
}

export const FormikError = ({ name, renderAction }: FormikErrorProps) => (
    <ErrorMessage name={name}>
        {(message: string) => (
            <span
                className="text-pzh-red-500 text-s mt-1 block"
                id={`error-${name}`}>
                {message}
                {renderAction?.(message)}
            </span>
        )}
    </ErrorMessage>
)
