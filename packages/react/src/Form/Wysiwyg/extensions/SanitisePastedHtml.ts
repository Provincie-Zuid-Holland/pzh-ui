import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import type { EditorView } from '@tiptap/pm/view'

type SanitiseResult = string | void

type SanitiseFunction = (props: {
    element: HTMLElement
    view: EditorView
}) => SanitiseResult

const sanitiseFunctions: SanitiseFunction[] = [
    /*
     * Remove nested tables.
     */
    ({ element }) => {
        let error: string | undefined

        const tables = Array.from(
            element.querySelectorAll<HTMLTableElement>('table')
        )

        for (const table of tables) {
            if (table.parentElement?.closest('table')) {
                error =
                    'Het plakken van een tabel in een tabel is niet toegestaan.'

                table.remove()
            }
        }

        return error
    },

    /*
     * Prevent pasted tables when the current editor selection is already
     * inside a table.
     */
    ({ element, view }) => {
        const tables = Array.from(
            element.querySelectorAll<HTMLTableElement>('table')
        )

        if (!tables.length) {
            return
        }

        const { $anchor } = view.state.selection

        let isInsideTable = false

        for (let depth = $anchor.depth; depth > 0; depth--) {
            if ($anchor.node(depth).type.name === 'table') {
                isInsideTable = true
                break
            }
        }

        if (!isInsideTable) {
            return
        }

        tables.forEach(table => table.remove())

        return 'Het plakken van een tabel op deze locatie is niet toegestaan.'
    },

    /*
     * Remove rows containing cells with rowspan/colspan greater than 1.
     */
    ({ element }) => {
        const tables = Array.from(
            element.querySelectorAll<HTMLTableElement>('table')
        )

        for (const table of tables) {
            const rows = Array.from(table.querySelectorAll('tr'))

            for (const row of rows) {
                const cells = Array.from(
                    row.querySelectorAll<HTMLTableCellElement>('th, td')
                )

                if (rows.length === 1 && cells.length === 1) {
                    table.remove()
                    break
                }

                const hasMergedCell = cells.some(cell => {
                    const colspan = Number.parseInt(
                        cell.getAttribute('colspan') ?? '1',
                        10
                    )

                    const rowspan = Number.parseInt(
                        cell.getAttribute('rowspan') ?? '1',
                        10
                    )

                    return colspan > 1 || rowspan > 1
                })

                if (hasMergedCell) {
                    row.remove()
                }
            }
        }
    },
]

export const SanitisePastedHtml = Extension.create({
    name: 'sanitisePastedHtml',

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('sanitisePastedHtml'),

                props: {
                    transformPastedHTML: (html, view) => {
                        const element = document.createElement('div')
                        element.innerHTML = html

                        const errors = sanitiseFunctions
                            .map(sanitise =>
                                sanitise({
                                    element,
                                    view,
                                })
                            )
                            .filter(
                                (error): error is string =>
                                    typeof error === 'string'
                            )

                        void errors

                        return element.innerHTML
                    },
                },
            }),
        ]
    },
})
