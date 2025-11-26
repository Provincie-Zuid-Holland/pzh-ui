import { ErrorMessage } from 'formik'

interface FormikErrorProps {
    name: string
}

export const FormikError = ({ name }: FormikErrorProps) => {
    return (
        <ErrorMessage name={name}>
            {(message: string) => (
                <span
                    className="text-pzh-red-500 text-s mt-1 block"
                    id={`error-${name}`}>
                    {message}
                </span>
            )}
        </ErrorMessage>
    )
}
