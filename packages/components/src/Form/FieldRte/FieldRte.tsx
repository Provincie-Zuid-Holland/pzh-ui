import 'react-quill/dist/quill.snow.css'
import { quill } from './styles.module.css'

import ReactQuill, { ReactQuillProps } from 'react-quill'

import { FieldLabel } from '../FieldLabel'
import classNames from 'classnames'

const DEFAULT_MODULES = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'bullet' }, { list: 'ordered' }],
    ],
}

const DEFAULT_FORMATS = ['bold', 'italic', 'underline', 'list', 'indent']

export interface FieldRteProps extends ReactQuillProps {
    name: string
    label?: string
    description?: string
    required?: boolean
    classes?: string
}

export const FieldRte = ({
    name,
    label,
    description,
    classes,
    required,
    formats = DEFAULT_FORMATS,
    modules = DEFAULT_MODULES,
    ...props
}: FieldRteProps) => (
    <>
        {label && (
            <FieldLabel
                name={name}
                label={label}
                description={description}
                required={required}
            />
        )}
        <ReactQuill
            theme="snow"
            formats={formats}
            modules={modules}
            className={classNames(classes, quill)}
            {...props}
        />
    </>
)
