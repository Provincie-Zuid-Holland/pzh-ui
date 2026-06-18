import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Extension } from '@tiptap/react'

const getListDepth = ($pos: any) => {
    let listDepth = 0

    for (let d = $pos.depth; d > 0; d--) {
        const node = $pos.node(d)

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
                if (!this.editor.isActive('listItem')) return false

                const { $from } = this.editor.state.selection
                const listDepth = getListDepth($from)

                // Important: return true so browser doesn't move focus
                if (listDepth >= this.options.maxDepth) return true

                return this.editor.commands.sinkListItem('listItem')
            },

            'Shift-Tab': () => {
                if (!this.editor.isActive('listItem')) return false

                return this.editor.commands.liftListItem('listItem')
            },
        }
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('nestedListLimit'),
                filterTransaction: tr => {
                    const { $anchor } = tr.selection
                    const listDepth = getListDepth($anchor)

                    return listDepth <= this.options.maxDepth
                },
            }),
        ]
    },
})
