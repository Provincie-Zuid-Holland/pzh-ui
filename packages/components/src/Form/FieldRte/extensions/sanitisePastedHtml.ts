import { Extension } from '@tiptap/react'
import { Plugin, PluginKey } from 'prosemirror-state'

type Error = string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanitiseFunction = (props: {
    html: string
    element: HTMLElement
    view: any
}) => void | Error

/**
 * This config contains all sanitise functions that are run when pasting HTML.
 *
 * If a dom node is not allowed, remove it from the `element`.
 * After all sanitise functions have run the `element` is converted back to HTML and put into the editor.
 */
const sanitiseFunctions: SanitiseFunction[] = [
    /**
     * Remove all nested tables
     */
    ({ element }) => {
        let error: Error | undefined

        const tables = [...element.querySelectorAll<HTMLTableElement>('table')]

        tables.forEach(table => {
            const isInsideTable = !!table.parentElement?.closest('table')

            if (isInsideTable) {
                error =
                    'Het plakken van een tabel in een tabel is niet toegestaan.'
                table.remove()
            }
        })

        return error
    },

    /**
     * Remove tables from pasted HTML when anchor is inside a table.
     */
    ({ element, view }) => {
        let error: Error | undefined

        const tables = [...element.querySelectorAll<HTMLTableElement>('table')]
        const anchorIsInsideTable =
            !!view?.state?.selection?.$anchor?.path?.find(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (item: any) => item?.type?.name === 'table'
            )

        if (anchorIsInsideTable && tables.length) {
            error =
                'Het plakken van een tabel op deze locatie is niet toegestaan.'
            tables.forEach(table => table.remove())
        }

        return error
    },
]

/**
 * This extension removes all nested tables from pasted HTML.
 */
export const SanitisePastedHtml = Extension.create({
    name: 'SanitisePastedHtml',

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('SanitisePastedHtml'),
                props: {
                    transformPastedHTML: (html, view) => {
                        const element = document.createElement('div')
                        element.innerHTML = html

                        const errors: Error[] = []

                        // Run all validations
                        sanitiseFunctions.forEach(sanitise => {
                            const error = sanitise({ html, element, view })

                            if (error) {
                                errors.push(error)
                            }
                        })

                        const cleanHtml = element.innerHTML

                        // Cleanup
                        element.remove()

                        return cleanHtml
                    },
                },
            }),
        ]
    },
})
