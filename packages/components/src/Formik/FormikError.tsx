import { ErrorMessage } from 'formik'

interface FormikErrorProps {
    name: string
}

export const FormikError = ({ name }: FormikErrorProps) => {
    return (
        <ErrorMessage name={name}>
            {(message: string) => (
                <span className="text-pzh-re-500 text-s mt-1 block">
                    {message}
                </span>
            )}
        </ErrorMessage>
    )
}
