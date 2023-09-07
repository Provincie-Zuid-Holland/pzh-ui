import { ErrorMessage } from 'formik'

interface FormikErrorProps {
    name: string
}

export const FormikError = ({ name }: FormikErrorProps) => {
    return (
        <ErrorMessage name={name}>
            {(message: string) => {
                return (
                    <span className="text-pzh-red text-s mt-1 block">
                        {message}
                    </span>
                )
            }}
        </ErrorMessage>
    )
}
