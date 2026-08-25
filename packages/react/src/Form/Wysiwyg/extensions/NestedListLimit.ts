import { Extension } from '@tiptap/core'
import type { ResolvedPos } from '@tiptap/pm/model'
import { Plugin, PluginKey } from '@tiptap/pm/state'

function getListDepth($pos: ResolvedPos) {
    let listDepth = 0

    for (let depth = $pos.depth; depth > 0; depth--) {
        const node = $pos.node(depth)

        if (
            node.type.name === 'bulletList' ||
            node.type.name === 'orderedList'
        ) {
            listDepth++
        }
    }

    return listDepth
}

export const NestedListLimit = Extension.create<{
    maxDepth: number
}>({
    name: 'nestedListLimit',

    addOptions() {
        return {
            maxDepth: 3,
        }
    },

    addKeyboardShortcuts() {
        return {
            Tab: () => {
                if (!this.editor.isActive('listItem')) {
                    return false
                }

                const { $from } = this.editor.state.selection
                const listDepth = getListDepth($from)

                if (listDepth >= this.options.maxDepth) {
                    return true
                }

                return this.editor.commands.sinkListItem('listItem')
            },

            'Shift-Tab': () => {
                if (!this.editor.isActive('listItem')) {
                    return false
                }

                return this.editor.commands.liftListItem('listItem')
            },
        }
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('nestedListLimit'),

                filterTransaction: transaction => {
                    if (!transaction.docChanged) {
                        return true
                    }

                    const { $anchor } = transaction.selection
                    const listDepth = getListDepth($anchor)

                    return listDepth <= this.options.maxDepth
                },
            }),
        ]
    },
})
