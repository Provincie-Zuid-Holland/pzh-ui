import 'react-quill/dist/quill.snow.css'
import './styles.css'

import ReactQuill, { ReactQuillProps } from 'react-quill'

import { FieldLabel } from '../FieldLabel'
import { quillDecodeIndent } from '../../utils/quillFixIndent'

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
    onChange,
    ...props
}: FieldRteProps) => {
    const handleChange: ReactQuillProps['onChange'] = (
        value,
        delta,
        source,
        editor
    ) => {
        const justHtml = editor.getHTML()
        const fixedHtml = quillDecodeIndent(justHtml)

        onChange?.(fixedHtml, delta, source, editor)

        return { value, delta, source, editor }
    }

    return (
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
                className={classes}
                onChange={handleChange}
                {...props}
            />
        </>
    )
}
