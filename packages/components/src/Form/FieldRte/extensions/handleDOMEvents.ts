import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Extension } from '@tiptap/react'

/**
 * This extension removes all nested tables from pasted HTML.
 */
export const HandleDOMEvents = Extension.create({
    name: 'HandleDOMEvents',

    addOptions() {
        return {
            callback: (bool: boolean) => {},
        }
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('HandleDOMEvents'),
                props: {
                    handleDOMEvents: {
                        contextmenu: (_, event) => {
                            if (!this.editor.isActive('table')) return

                            event.preventDefault()
                            this.options.callback(true)
                        },
                        mousedown: () => {
                            this.options.callback(false)
                        },
                    },
                },
            }),
        ]
    },
})
