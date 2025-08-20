import { Extension } from '@tiptap/core'
import { sinkListItem } from 'prosemirror-schema-list'
import { Plugin, PluginKey } from 'prosemirror-state'

export const NestedListLimit = Extension.create<{
    maxDepth: number
}>({
    name: 'nestedListLimit',

    addOptions() {
        return {
            maxDepth: 3,
        }
    },

    addCommands() {
        return {
            sinkListItem:
                () =>
                ({ state, dispatch }) => {
                    const { $from } = state.selection
                    let listDepth = 0

                    for (let d = $from.depth; d > 0; d--) {
                        const node = $from.node(d)
                        if (
                            node.type.name === 'bulletList' ||
                            node.type.name === 'orderedList'
                        ) {
                            listDepth++
                        }
                    }

                    if (listDepth >= this.options.maxDepth) {
                        return false
                    }

                    const listItemType = state.schema.nodes.listItem
                    return sinkListItem(listItemType)(state, dispatch)
                },
        }
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('nestedListLimit'),
                filterTransaction: tr => {
                    const { $anchor } = tr.selection
                    let listDepth = 0

                    for (let d = $anchor.depth; d > 0; d--) {
                        const node = $anchor.node(d)
                        if (
                            node.type.name === 'bulletList' ||
                            node.type.name === 'orderedList'
                        ) {
                            listDepth++
                        }
                    }

                    return listDepth <= this.options.maxDepth
                },
            }),
        ]
    },
})
