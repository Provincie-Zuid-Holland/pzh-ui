import { Extension } from '@tiptap/core'
import { Plugin, Selection } from '@tiptap/pm/state'

export interface HandleDOMEventsOptions {
    onTableContextMenu?: (args: {
        x: number
        y: number
        event: MouseEvent
    }) => void
    onPointerDown?: (event: PointerEvent) => void
}

export const HandleDOMEvents = Extension.create<HandleDOMEventsOptions>({
    name: 'handleDOMEvents',

    addOptions() {
        return {
            onTableContextMenu: undefined,
            onPointerDown: undefined,
        }
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                props: {
                    handleDOMEvents: {
                        contextmenu: (view, event) => {
                            if (!(event instanceof MouseEvent)) {
                                return false
                            }

                            const target = event.target

                            if (!(target instanceof HTMLElement)) {
                                return false
                            }

                            const cell = target.closest('td, th')

                            if (!cell) {
                                return false
                            }

                            event.preventDefault()

                            const position = view.posAtDOM(cell, 0)

                            if (position >= 0) {
                                view.dispatch(
                                    view.state.tr.setSelection(
                                        Selection.near(
                                            view.state.doc.resolve(position + 1)
                                        )
                                    )
                                )
                            }

                            this.options.onTableContextMenu?.({
                                x: event.clientX,
                                y: event.clientY,
                                event,
                            })

                            return true
                        },

                        pointerdown: (_view, event) => {
                            if (!(event instanceof PointerEvent)) {
                                return false
                            }

                            const target = event.target

                            if (
                                target instanceof HTMLElement &&
                                target.closest(
                                    '[data-slot="wysiwyg-toolbar"], [data-slot="wysiwyg-table-menu"]'
                                )
                            ) {
                                return false
                            }

                            this.options.onPointerDown?.(event)

                            return false
                        },
                    },
                },
            }),
        ]
    },
})
