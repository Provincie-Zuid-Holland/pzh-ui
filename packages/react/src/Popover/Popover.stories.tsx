import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import {
    Popover,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from './Popover'

const meta = {
    title: 'Componenten/Popover',
    component: Popover,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Popover>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <PopoverTrigger>
            <Button variant="secondary">Open popover</Button>

            <Popover>
                <PopoverHeader>
                    <PopoverTitle>Popover titel</PopoverTitle>

                    <PopoverDescription>
                        Dit is aanvullende informatie die in een popover wordt
                        weergegeven.
                    </PopoverDescription>
                </PopoverHeader>
            </Popover>
        </PopoverTrigger>
    ),
}

export const WithContent: Story = {
    render: () => (
        <PopoverTrigger>
            <Button variant="secondary">Meer informatie</Button>

            <Popover>
                <PopoverHeader>
                    <PopoverTitle>Meer informatie</PopoverTitle>

                    <PopoverDescription>
                        Gebruik een popover voor korte, aanvullende informatie
                        of acties zonder de gebruiker uit de huidige context te
                        halen.
                    </PopoverDescription>
                </PopoverHeader>

                <div>
                    Hier kan aanvullende inhoud worden geplaatst, zoals tekst,
                    links of andere componenten.
                </div>
            </Popover>
        </PopoverTrigger>
    ),
}

export const Placement: Story = {
    render: () => (
        <div className="gap-4 flex">
            <PopoverTrigger>
                <Button variant="secondary">Boven</Button>

                <Popover placement="top">
                    <PopoverHeader>
                        <PopoverTitle>Boven</PopoverTitle>
                        <PopoverDescription>
                            Deze popover wordt boven de trigger weergegeven.
                        </PopoverDescription>
                    </PopoverHeader>
                </Popover>
            </PopoverTrigger>

            <PopoverTrigger>
                <Button variant="secondary">Onder</Button>

                <Popover placement="bottom">
                    <PopoverHeader>
                        <PopoverTitle>Onder</PopoverTitle>
                        <PopoverDescription>
                            Deze popover wordt onder de trigger weergegeven.
                        </PopoverDescription>
                    </PopoverHeader>
                </Popover>
            </PopoverTrigger>

            <PopoverTrigger>
                <Button variant="secondary">Links</Button>

                <Popover placement="left">
                    <PopoverHeader>
                        <PopoverTitle>Links</PopoverTitle>
                        <PopoverDescription>
                            Deze popover wordt links van de trigger weergegeven.
                        </PopoverDescription>
                    </PopoverHeader>
                </Popover>
            </PopoverTrigger>

            <PopoverTrigger>
                <Button variant="secondary">Rechts</Button>

                <Popover placement="right">
                    <PopoverHeader>
                        <PopoverTitle>Rechts</PopoverTitle>
                        <PopoverDescription>
                            Deze popover wordt rechts van de trigger
                            weergegeven.
                        </PopoverDescription>
                    </PopoverHeader>
                </Popover>
            </PopoverTrigger>
        </div>
    ),
}

export const CustomOffset: Story = {
    render: () => (
        <PopoverTrigger>
            <Button variant="secondary">Open popover</Button>

            <Popover offset={16}>
                <PopoverHeader>
                    <PopoverTitle>Aangepaste afstand</PopoverTitle>
                    <PopoverDescription>
                        Deze popover gebruikt een offset van 16 pixels.
                    </PopoverDescription>
                </PopoverHeader>
            </Popover>
        </PopoverTrigger>
    ),
}
