import { MagnifyingGlass, Minus, Plus } from '@pzh-ui/icons'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { Input } from '../Form/Input'
import {
    ButtonGroup,
    ButtonGroupSeparator,
    ButtonGroupText,
} from './ButtonGroup'

const meta = {
    title: 'Componenten/ButtonGroup',
    component: ButtonGroup,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
        },
    },
    args: {
        orientation: 'horizontal',
    },
} satisfies Meta<typeof ButtonGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => (
        <ButtonGroup {...args} aria-label="Documentacties">
            <Button variant="secondary">Opslaan</Button>
            <Button variant="secondary">Dupliceren</Button>
            <Button variant="secondary">Verwijderen</Button>
        </ButtonGroup>
    ),
}

export const Vertical: Story = {
    render: args => (
        <ButtonGroup
            {...args}
            orientation="vertical"
            aria-label="Documentacties">
            <Button variant="secondary">Opslaan</Button>
            <Button variant="secondary">Dupliceren</Button>
            <Button variant="secondary">Verwijderen</Button>
        </ButtonGroup>
    ),
}

export const WithSeparator: Story = {
    render: args => (
        <ButtonGroup {...args} aria-label="Aantal aanpassen">
            <Button variant="secondary" aria-label="Verlagen">
                <Minus />
            </Button>
            <ButtonGroupText>1</ButtonGroupText>
            <ButtonGroupSeparator />
            <Button variant="secondary" aria-label="Verhogen">
                <Plus />
            </Button>
        </ButtonGroup>
    ),
}

export const WithText: Story = {
    render: args => (
        <ButtonGroup {...args} aria-label="Website openen">
            <ButtonGroupText>https://</ButtonGroupText>
            <Button variant="secondary">zuid-holland.nl</Button>
        </ButtonGroup>
    ),
}

export const WithInput: Story = {
    render: args => (
        <ButtonGroup {...args}>
            <Input placeholder="Search..." />
            <Button variant="secondary" aria-label="Search">
                <MagnifyingGlass />
            </Button>
        </ButtonGroup>
    ),
}

export const Nested: Story = {
    render: args => (
        <ButtonGroup {...args} aria-label="Tekstopmaak">
            <ButtonGroup aria-label="Uitlijning">
                <Button variant="secondary">Links</Button>
                <Button variant="secondary">Midden</Button>
                <Button variant="secondary">Rechts</Button>
            </ButtonGroup>

            <ButtonGroup aria-label="Bewerken">
                <Button variant="secondary">Ongedaan maken</Button>
                <Button variant="secondary">Opnieuw</Button>
            </ButtonGroup>
        </ButtonGroup>
    ),
}
