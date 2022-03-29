import { ErrorMessage } from 'formik'

interface FormikErrorProps {
    name: string
}

export const FormikError = ({ name }: FormikErrorProps) => {
    return (
        <div className="mt-1">
            <ErrorMessage name={name}>
                {message => {
                    return (
                        <span className="block text-pzh-red text-xs">
                            {message}
                        </span>
                    )
                }}
            </ErrorMessage>
        </div>
    )
}
