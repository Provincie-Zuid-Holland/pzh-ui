import { useState } from 'react'

import { Ellipsis } from '@pzh-ui/icons'

import type { Meta, StoryObj } from '@storybook/react-vite'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from './DropdownMenu'

const meta = {
    title: 'Componenten/DropdownMenu',
    component: DropdownMenu,
    args: { children: null },
    parameters: { layout: 'centered' },
} satisfies Meta<typeof DropdownMenu>

export default meta

type Story = StoryObj<typeof meta>

function Example({ size = 'm' }: { size?: 's' | 'm' }) {
    const [action, setAction] = useState('')
    return (
        <div className="space-y-4">
            <DropdownMenu>
                <DropdownMenuTrigger variant="default" aria-label="Acties">
                    <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    size={size}
                    aria-label="Acties"
                    onAction={key => setAction(String(key))}>
                    <DropdownMenuItem id="edit">Bewerken</DropdownMenuItem>
                    <DropdownMenuItem id="archive">Archiveren</DropdownMenuItem>
                    <DropdownMenuItem id="disabled" isDisabled>
                        Verwijderen
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <p role="status">
                {action ? `Gekozen actie: ${action}` : 'Kies een actie.'}
            </p>
        </div>
    )
}

export const Default: Story = { render: () => <Example /> }

export const Small: Story = { render: () => <Example size="s" /> }

export const Medium: Story = { render: () => <Example size="m" /> }

export const Submenu: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger>Menu openen</DropdownMenuTrigger>
            <DropdownMenuContent aria-label="Projectacties">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Project</DropdownMenuLabel>
                    <DropdownMenuItem id="open">Openen</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Exporteren</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent aria-label="Exportformaten">
                        <DropdownMenuItem id="pdf">PDF</DropdownMenuItem>
                        <DropdownMenuItem id="csv">CSV</DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem id="delete" variant="destructive">
                    Verwijderen
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
}
