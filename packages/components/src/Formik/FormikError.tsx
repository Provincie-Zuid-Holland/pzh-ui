import { ErrorMessage } from 'formik'

interface FormikErrorProps {
    name: string
}

export const FormikError = ({ name }: FormikErrorProps) => {
    return (
        <ErrorMessage name={name}>
            {message => {
                return (
                    <span className="block mt-1 text-pzh-red text-xs">
                        {message}
                    </span>
                )
            }}
        </ErrorMessage>
    )
}
