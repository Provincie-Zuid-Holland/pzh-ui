import 'react-quill/dist/quill.snow.css'
import './styles.css'

import ReactQuill, { ReactQuillProps } from 'react-quill'

import { FieldLabel } from '../FieldLabel'
import { quillDecodeIndent } from '../../utils/quillFixIndent'

export interface FieldRteProps extends ReactQuillProps {
    name: string
    label?: string
    description?: string
    required?: boolean
    disabled?: boolean
}

export const FieldRte = ({
    name,
    label,
    description,
    className,
    required,
    formats = DEFAULT_FORMATS,
    modules = DEFAULT_MODULES,
    onChange,
    disabled,
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
            <div onDrop={e => !formats.includes('image') && e.preventDefault()}>
                <ReactQuill
                    theme="snow"
                    formats={formats}
                    modules={{ ...modules, ...keyBoardBindings }}
                    className={className}
                    onChange={handleChange}
                    readOnly={disabled}
                    {...props}
                />
            </div>
        </>
    )
}

const DEFAULT_MODULES = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'bullet' }, { list: 'ordered' }],
    ],
}

const DEFAULT_FORMATS = ['bold', 'italic', 'underline', 'list', 'indent']

const keyBoardBindings = {
    keyboard: {
        bindings: {
            indent: {
                key: 9,
                format: ['blockquote', 'indent', 'list'],
                handler: function (this: any, range: { index: number }) {
                    // We want to disable the indentation if:
                    // - (1) The current line is the first line and the indent level is 0 (not indented)
                    // - (2) The current line is a list and the previous line is not a list
                    // - (3) The current line is a list and the previous line too, but the previous lines indentation level is already one level lower

                    const currentLineFormats = this.quill.getFormat(range.index)
                    const previousLineFormats = this.quill.getFormat(
                        range.index - 1
                    )
                    const currentLineIsAList = !!currentLineFormats.list
                    const previousLineIsAList = !!previousLineFormats.list
                    const currentLineIndent = currentLineFormats.indent || 0
                    const previousLineIndent = previousLineFormats.indent || 0

                    if (
                        (range.index === 0 && currentLineIndent === 0) ||
                        (currentLineIsAList && !previousLineIsAList) ||
                        (currentLineIsAList &&
                            previousLineIsAList &&
                            previousLineIndent === currentLineIndent - 1)
                    ) {
                        return
                    }

                    return this.quill.format('indent', '+1', 'user')
                },
            },
        },
    },
}
