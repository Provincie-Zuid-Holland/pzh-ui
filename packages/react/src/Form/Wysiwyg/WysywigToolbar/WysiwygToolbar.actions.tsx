import type { Editor } from '@tiptap/core'

import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    Image as ImageIcon,
    Italic,
    Link as LinkIcon,
    List,
    ListOl,
    Strikethrough,
    Subscript,
    Superscript,
    Table,
    Underline,
} from '@pzh-ui/icons'

import type { WysiwygToolbarOption } from '../Wysiwyg.types'
import type {
    ToolbarAction,
    ToolbarGroupDefinition,
    ToolbarState,
} from './WysiwygToolbar.types'

type CreateToolbarGroupsOptions = {
    editor: Editor
    options: WysiwygToolbarOption[]
    state: ToolbarState
    disabled: boolean
    onImage: () => void
}

export function createToolbarGroups({
    editor,
    options,
    state,
    disabled,
    onImage,
}: CreateToolbarGroupsOptions): ToolbarGroupDefinition[] {
    const groups: ToolbarGroupDefinition[] = []

    const isActive = (active: boolean) => state.focused && active

    addGroup(groups, 'text', [
        action(options.includes('bold'), {
            key: 'bold',
            label: 'Vet',
            icon: <Bold aria-hidden="true" />,
            active: isActive(state.bold),
            disabled,
            onAction: () => {
                editor.chain().focus().toggleBold().run()
            },
        }),

        action(options.includes('italic'), {
            key: 'italic',
            label: 'Cursief',
            icon: <Italic aria-hidden="true" />,
            active: isActive(state.italic),
            disabled,
            onAction: () => {
                editor.chain().focus().toggleItalic().run()
            },
        }),

        action(options.includes('underline'), {
            key: 'underline',
            label: 'Onderstrepen',
            icon: <Underline aria-hidden="true" />,
            active: isActive(state.underline),
            disabled,
            onAction: () => {
                editor.chain().focus().toggleUnderline().run()
            },
        }),

        action(options.includes('strike'), {
            key: 'strike',
            label: 'Doorhalen',
            icon: <Strikethrough aria-hidden="true" />,
            active: isActive(state.strike),
            disabled,
            onAction: () => {
                editor.chain().focus().toggleStrike().run()
            },
        }),
    ])

    addGroup(groups, 'alignment', [
        action(options.includes('alignLeft'), {
            key: 'align-left',
            label: 'Links uitlijnen',
            icon: <AlignLeft aria-hidden="true" />,
            active: isActive(state.alignLeft),
            disabled,
            onAction: () => {
                editor.chain().focus().setTextAlign('left').run()
            },
        }),

        action(options.includes('alignCenter'), {
            key: 'align-center',
            label: 'Centreren',
            icon: <AlignCenter aria-hidden="true" />,
            active: isActive(state.alignCenter),
            disabled,
            onAction: () => {
                editor.chain().focus().setTextAlign('center').run()
            },
        }),

        action(options.includes('alignRight'), {
            key: 'align-right',
            label: 'Rechts uitlijnen',
            icon: <AlignRight aria-hidden="true" />,
            active: isActive(state.alignRight),
            disabled,
            onAction: () => {
                editor.chain().focus().setTextAlign('right').run()
            },
        }),

        action(options.includes('alignJustify'), {
            key: 'align-justify',
            label: 'Uitvullen',
            icon: <AlignJustify aria-hidden="true" />,
            active: isActive(state.alignJustify),
            disabled,
            onAction: () => {
                editor.chain().focus().setTextAlign('justify').run()
            },
        }),
    ])

    addGroup(groups, 'table', [
        action(options.includes('table'), {
            key: 'table',
            label: 'Tabel invoegen',
            icon: <Table aria-hidden="true" />,
            disabled: disabled || state.inTable,
            onAction: () => {
                editor
                    .chain()
                    .focus()
                    .insertTable({
                        rows: 3,
                        cols: 3,
                        withHeaderRow: true,
                    })
                    .run()
            },
        }),
    ])

    addGroup(groups, 'lists', [
        action(options.includes('bulletList'), {
            key: 'bullet-list',
            label: 'Opsomming',
            icon: <List aria-hidden="true" />,
            active: isActive(state.bulletList),
            disabled,
            onAction: () => {
                editor.chain().focus().toggleBulletList().run()
            },
        }),

        action(options.includes('orderedList'), {
            key: 'ordered-list',
            label: 'Genummerde lijst',
            icon: <ListOl aria-hidden="true" />,
            active: isActive(state.orderedList),
            disabled,
            onAction: () => {
                editor.chain().focus().toggleOrderedList().run()
            },
        }),
    ])

    addGroup(groups, 'script', [
        action(options.includes('subscript'), {
            key: 'subscript',
            label: 'Subscript',
            icon: <Subscript aria-hidden="true" />,
            active: isActive(state.subscript),
            disabled,
            onAction: () => {
                editor.chain().focus().toggleSubscript().run()
            },
        }),

        action(options.includes('superscript'), {
            key: 'superscript',
            label: 'Superscript',
            icon: <Superscript aria-hidden="true" />,
            active: isActive(state.superscript),
            disabled,
            onAction: () => {
                editor.chain().focus().toggleSuperscript().run()
            },
        }),
    ])

    addGroup(groups, 'link', [
        action(options.includes('link'), {
            key: 'link',
            type: 'link',
            label: 'Link toevoegen',
            icon: <LinkIcon aria-hidden="true" />,
            active: state.link,
            disabled,
        }),
    ])

    addGroup(groups, 'image', [
        action(options.includes('image'), {
            key: 'image',
            label: 'Afbeelding toevoegen',
            icon: <ImageIcon aria-hidden="true" />,
            disabled,
            onAction: onImage,
        }),
    ])

    return groups
}

function action(enabled: boolean, value: ToolbarAction): ToolbarAction | null {
    return enabled ? value : null
}

function addGroup(
    groups: ToolbarGroupDefinition[],
    key: string,
    actions: Array<ToolbarAction | null>
) {
    const availableActions = actions.filter(
        (item): item is ToolbarAction => item !== null
    )

    if (availableActions.length === 0) {
        return
    }

    groups.push({
        key,
        actions: availableActions,
    })
}
