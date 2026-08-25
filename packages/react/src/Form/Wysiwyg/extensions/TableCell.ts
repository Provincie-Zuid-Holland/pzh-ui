import { TableCell } from '@tiptap/extension-table'

const CustomTableCell = TableCell.extend({
    addAttributes() {
        return {
            ...this.parent?.(),

            backgroundColor: {
                default: null,

                parseHTML: element => element.style.backgroundColor || null,

                renderHTML: attributes => {
                    if (!attributes.backgroundColor) {
                        return {}
                    }

                    return {
                        style: `background-color: ${attributes.backgroundColor}`,
                    }
                },
            },
        }
    },
})

export { CustomTableCell }
