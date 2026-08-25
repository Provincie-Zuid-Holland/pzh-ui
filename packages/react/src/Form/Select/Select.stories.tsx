import type { Meta, StoryObj } from '@storybook/react-vite'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectList,
    SelectPopover,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from './Select'

const meta = {
    title: 'Componenten/Form/Select',
    component: Select,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        Story => (
            <div className="w-[min(400px,calc(100vw-2rem))]">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

const provinces = [
    { id: 'drenthe', name: 'Drenthe' },
    { id: 'flevoland', name: 'Flevoland' },
    { id: 'friesland', name: 'Friesland' },
    { id: 'gelderland', name: 'Gelderland' },
    { id: 'groningen', name: 'Groningen' },
    { id: 'limburg', name: 'Limburg' },
    { id: 'noord-brabant', name: 'Noord-Brabant' },
    { id: 'noord-holland', name: 'Noord-Holland' },
    { id: 'overijssel', name: 'Overijssel' },
    { id: 'utrecht', name: 'Utrecht' },
    { id: 'zeeland', name: 'Zeeland' },
    { id: 'zuid-holland', name: 'Zuid-Holland' },
]

export const Default: Story = {
    render: () => (
        <Select size="l" placeholder="Selecteer een provincie">
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                {provinces.map(province => (
                    <SelectItem key={province.id} id={province.id}>
                        {province.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    ),
}

export const WithDefaultValue: Story = {
    render: () => (
        <Select
            size="l"
            defaultSelectedKey="zuid-holland"
            placeholder="Selecteer een provincie">
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                {provinces.map(province => (
                    <SelectItem key={province.id} id={province.id}>
                        {province.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    ),
}

export const Disabled: Story = {
    render: () => (
        <Select size="l" isDisabled placeholder="Selecteer een provincie">
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                {provinces.map(province => (
                    <SelectItem key={province.id} id={province.id}>
                        {province.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    ),
}

export const WithDisabledItem: Story = {
    render: () => (
        <Select size="l" placeholder="Selecteer een provincie">
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                <SelectItem id="noord-holland">Noord-Holland</SelectItem>
                <SelectItem id="utrecht" isDisabled>
                    Utrecht
                </SelectItem>
                <SelectItem id="zuid-holland">Zuid-Holland</SelectItem>
            </SelectContent>
        </Select>
    ),
}

export const Medium: Story = {
    render: () => (
        <Select size="m" placeholder="Selecteer een provincie">
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                <SelectItem id="noord-holland">Noord-Holland</SelectItem>
                <SelectItem id="utrecht">Utrecht</SelectItem>
                <SelectItem id="zuid-holland">Zuid-Holland</SelectItem>
            </SelectContent>
        </Select>
    ),
}

export const WithGroups: Story = {
    render: () => (
        <Select size="l" placeholder="Selecteer een provincie">
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>

            <SelectPopover>
                <SelectList>
                    <SelectGroup>
                        <SelectLabel>Randstad</SelectLabel>

                        <SelectItem id="noord-holland">
                            Noord-Holland
                        </SelectItem>
                        <SelectItem id="utrecht">Utrecht</SelectItem>
                        <SelectItem id="zuid-holland">Zuid-Holland</SelectItem>
                    </SelectGroup>

                    <SelectSeparator />

                    <SelectGroup>
                        <SelectLabel>Overige provincies</SelectLabel>

                        <SelectItem id="drenthe">Drenthe</SelectItem>
                        <SelectItem id="flevoland">Flevoland</SelectItem>
                        <SelectItem id="friesland">Friesland</SelectItem>
                        <SelectItem id="gelderland">Gelderland</SelectItem>
                        <SelectItem id="groningen">Groningen</SelectItem>
                        <SelectItem id="limburg">Limburg</SelectItem>
                    </SelectGroup>
                </SelectList>
            </SelectPopover>
        </Select>
    ),
}

export const Multiple: Story = {
    render: () => (
        <Select
            size="l"
            selectionMode="multiple"
            placeholder="Selecteer provincies">
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                {provinces.map(province => (
                    <SelectItem key={province.id} id={province.id}>
                        {province.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    ),
}

export const LongList: Story = {
    render: () => (
        <Select size="l" placeholder="Selecteer een provincie">
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>

            <SelectPopover className="max-h-64">
                <SelectList>
                    {provinces.map(province => (
                        <SelectItem key={province.id} id={province.id}>
                            {province.name}
                        </SelectItem>
                    ))}
                </SelectList>
            </SelectPopover>
        </Select>
    ),
}
