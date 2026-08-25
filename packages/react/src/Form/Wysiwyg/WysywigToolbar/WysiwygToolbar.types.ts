import type * as React from 'react'

export type ToolbarState = {
    focused: boolean
    inTable: boolean

    bold: boolean
    italic: boolean
    underline: boolean
    strike: boolean
    alignLeft: boolean
    alignCenter: boolean
    alignRight: boolean
    alignJustify: boolean
    bulletList: boolean
    orderedList: boolean
    subscript: boolean
    superscript: boolean
    link: boolean
}

export type ToolbarAction =
    | {
          key: string
          type?: 'button'
          label: string
          icon: React.ReactNode
          active?: boolean
          disabled?: boolean
          onAction: () => void
      }
    | {
          key: string
          type: 'link'
          label: string
          icon: React.ReactNode
          active?: boolean
          disabled?: boolean
      }

export type ToolbarGroupDefinition = {
    key: string
    actions: ToolbarAction[]
}
