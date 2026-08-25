import { CircleInfo, Envelope, Gear, House } from '@pzh-ui/icons'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'

const meta = {
    title: 'Componenten/Tabs',
    component: Tabs,
    parameters: { layout: 'centered' },
    args: { defaultSelectedKey: 'gouda' },
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

function CityTabs({ size }: { size: 'm' | 'l' }) {
    return (
        <Tabs size={size} defaultSelectedKey="gouda">
            <TabsList aria-label="Vestigingen">
                <TabsTrigger id="rotterdam">
                    <House /> Rotterdam
                </TabsTrigger>
                <TabsTrigger id="den-haag">
                    <House /> Den Haag
                    <span
                        aria-hidden="true"
                        className="top-2 right-1 size-2 absolute rounded-full bg-destructive"
                    />
                </TabsTrigger>
                <TabsTrigger id="gouda">
                    <House /> Gouda
                </TabsTrigger>
                <TabsTrigger id="alphen" isDisabled>
                    <House /> Alphen a/d Rijn
                </TabsTrigger>
            </TabsList>
            <TabsContent id="rotterdam">Rotterdam</TabsContent>
            <TabsContent id="den-haag">Den Haag</TabsContent>
            <TabsContent id="gouda">Gouda</TabsContent>
            <TabsContent id="alphen">Alphen aan den Rijn</TabsContent>
        </Tabs>
    )
}

function NavigationTabs({ size }: { size: 'm' | 'l' }) {
    return (
        <Tabs orientation="vertical" size={size} defaultSelectedKey="home">
            <TabsList aria-label="Navigatie">
                <TabsTrigger id="home">
                    <House /> Home
                </TabsTrigger>
                <TabsTrigger id="about">
                    <CircleInfo /> About
                </TabsTrigger>
                <TabsTrigger id="services">
                    <Gear /> Services
                </TabsTrigger>
                <TabsTrigger id="contact">
                    <Envelope /> Contact
                </TabsTrigger>
            </TabsList>
            <TabsContent id="home">Home</TabsContent>
            <TabsContent id="about">About</TabsContent>
            <TabsContent id="services">Services</TabsContent>
            <TabsContent id="contact">Contact</TabsContent>
        </Tabs>
    )
}

export const HorizontalL: Story = {
    render: () => <CityTabs size="l" />,
}

export const HorizontalM: Story = {
    render: () => <CityTabs size="m" />,
}

export const VerticalL: Story = {
    render: () => <NavigationTabs size="l" />,
}

export const VerticalM: Story = {
    render: () => <NavigationTabs size="m" />,
}

export const Filled: Story = {
    render: () => (
        <Tabs defaultSelectedKey="overview">
            <TabsList aria-label="Project" variant="default">
                <TabsTrigger id="overview">Overzicht</TabsTrigger>
                <TabsTrigger id="activity">Activiteit</TabsTrigger>
                <TabsTrigger id="settings">Instellingen</TabsTrigger>
            </TabsList>
            <TabsContent id="overview">Overzicht</TabsContent>
            <TabsContent id="activity">Activiteit</TabsContent>
            <TabsContent id="settings">Instellingen</TabsContent>
        </Tabs>
    ),
}
