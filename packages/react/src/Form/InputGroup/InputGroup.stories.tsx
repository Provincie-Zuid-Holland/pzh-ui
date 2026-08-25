import { MagnifyingGlass } from '@pzh-ui/icons'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { FieldError } from '../Field'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
} from './InputGroup'

const meta = {
    title: 'Componenten/Form/InputGroup',
    component: InputGroup,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        Story => (
            <div className="w-[min(500px,calc(100vw-2rem))]">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof InputGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <InputGroup>
            <InputGroupAddon align="inline-start">
                <InputGroupText>€</InputGroupText>
            </InputGroupAddon>

            <InputGroupInput aria-label="Bedrag" placeholder="0,00" />
        </InputGroup>
    ),
}

export const WithTrailingText: Story = {
    render: () => (
        <InputGroup>
            <InputGroupInput aria-label="Gewicht" placeholder="0" />

            <InputGroupAddon align="inline-end">
                <InputGroupText>kg</InputGroupText>
            </InputGroupAddon>
        </InputGroup>
    ),
}

export const WithLeadingAndTrailingText: Story = {
    render: () => (
        <InputGroup>
            <InputGroupAddon align="inline-start">
                <InputGroupText>https://</InputGroupText>
            </InputGroupAddon>

            <InputGroupInput aria-label="Website" placeholder="voorbeeld.nl" />

            <InputGroupAddon align="inline-end">
                <InputGroupText>.nl</InputGroupText>
            </InputGroupAddon>
        </InputGroup>
    ),
}

export const WithIcon: Story = {
    render: () => (
        <InputGroup>
            <InputGroupAddon align="inline-start">
                <MagnifyingGlass />
            </InputGroupAddon>

            <InputGroupInput aria-label="Zoeken" placeholder="Zoeken..." />
        </InputGroup>
    ),
}

export const WithButton: Story = {
    render: () => (
        <InputGroup>
            <InputGroupInput aria-label="Zoeken" placeholder="Zoeken..." />

            <InputGroupAddon align="inline-end">
                <InputGroupButton>Zoeken</InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    ),
}

export const WithIconButton: Story = {
    render: () => (
        <InputGroup>
            <InputGroupInput aria-label="Zoeken" placeholder="Zoeken..." />

            <InputGroupAddon align="inline-end">
                <InputGroupButton variant="secondary" aria-label="Zoeken">
                    <MagnifyingGlass size={18} />
                </InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    ),
}

export const BlockStart: Story = {
    render: () => (
        <InputGroup>
            <InputGroupAddon align="block-start">
                <InputGroupText>https://www.zuid-holland.nl/</InputGroupText>
            </InputGroupAddon>

            <InputGroupInput aria-label="URL" placeholder="pagina" />
        </InputGroup>
    ),
}

export const BlockEnd: Story = {
    render: () => (
        <InputGroup>
            <InputGroupInput
                aria-label="Gebruikersnaam"
                placeholder="Gebruikersnaam"
            />

            <InputGroupAddon align="block-end">
                <InputGroupText>Maximaal 50 tekens</InputGroupText>
            </InputGroupAddon>
        </InputGroup>
    ),
}

export const Disabled: Story = {
    render: () => (
        <InputGroup>
            <InputGroupAddon align="inline-start">
                <InputGroupText>€</InputGroupText>
            </InputGroupAddon>

            <InputGroupInput
                aria-label="Bedrag"
                defaultValue="123,45"
                disabled
            />
        </InputGroup>
    ),
}

export const Invalid: Story = {
    render: () => (
        <>
            <InputGroup>
                <InputGroupAddon align="inline-start">
                    <InputGroupText>€</InputGroupText>
                </InputGroupAddon>

                <InputGroupInput
                    aria-label="Bedrag"
                    defaultValue="ongeldig"
                    aria-invalid
                />
            </InputGroup>
            <FieldError errors={[{ message: 'Dit veld is onjuist.' }]} />
        </>
    ),
}

export const Examples: Story = {
    render: () => (
        <div className="gap-4 flex flex-col">
            <InputGroup>
                <InputGroupAddon align="inline-start">
                    <InputGroupText>€</InputGroupText>
                </InputGroupAddon>

                <InputGroupInput aria-label="Bedrag" placeholder="0,00" />
            </InputGroup>

            <InputGroup>
                <InputGroupInput aria-label="Zoeken" placeholder="Zoeken..." />

                <InputGroupAddon align="inline-end">
                    <InputGroupButton variant="secondary" aria-label="Zoeken">
                        <MagnifyingGlass />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>

            <InputGroup>
                <InputGroupAddon align="inline-start">
                    <InputGroupText>https://</InputGroupText>
                </InputGroupAddon>

                <InputGroupInput
                    aria-label="Website"
                    placeholder="voorbeeld.nl"
                />

                <InputGroupAddon align="inline-end">
                    <InputGroupText>.nl</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        </div>
    ),
}
