import { ErrorMessage } from 'formik'

interface FormikErrorProps {
    name: string
}

export const FormikError = ({ name }: FormikErrorProps) => {
    return (
        <ErrorMessage name={name}>
            {(message: string) => {
                return (
                    <span className="block mt-1 text-pzh-red text-xs">
                        {message}
                    </span>
                )
            }}
        </ErrorMessage>
    )
}
