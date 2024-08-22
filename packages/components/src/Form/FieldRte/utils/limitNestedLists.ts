import { Fragment, Node, ResolvedPos } from '@tiptap/pm/model'
import { EditorOptions } from '@tiptap/react'

// Define the maximum allowed depth for nested lists
const MAX_DEPTH = 3

// Define the onUpdate function for limiting nested lists
const limitNestedLists: EditorOptions['onUpdate'] = ({
    transaction,
    editor,
}) => {
    // Get the anchor position with path information
    const anchor = transaction.selection.$anchor as unknown
    const el = anchor as ResolvedPos & { path: Node[] }

    // Filter out the lists (bulletList or orderedList nodes) in the path
    const lists = el.path.filter(
        (el: Node) =>
            el.type?.name === 'bulletList' || el.type?.name === 'orderedList'
    )

    // If there are no lists, return early
    if (!lists.length) return

    // If there are more lists than the maximum allowed depth, delete the excess lists
    if (lists.length > MAX_DEPTH) {
        const listsToDelete = lists.slice(MAX_DEPTH)
        listsToDelete.forEach(list =>
            editor.commands.deleteNode(list.type.name)
        )
    } else {
        // Get the content of the first list
        const { firstChild } = el.path[0]

        // Recursive function to collect nested lists
        const filterLists = (fragment?: Fragment, depth = 1) => {
            return fragment?.forEach(el => {
                if (el.type.name === 'listItem') {
                    // Check if the depth is within the allowed limit
                    if (depth <= MAX_DEPTH) {
                        filterLists(el.content, depth + 1)
                    } else {
                        // If the depth exceeds the limit, delete this list
                        editor.commands.deleteNode(el.type.name)
                    }
                } else if (
                    el.type.name === 'bulletList' ||
                    el.type.name === 'orderedList'
                ) {
                    filterLists(el.content, depth)
                }
            })
        }

        // Collect nested lists within the first list's content
        filterLists(firstChild?.content)
    }
}

export default limitNestedLists
