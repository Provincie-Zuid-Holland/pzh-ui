import { House } from '@pzh-ui/icons'

import type { Meta, StoryObj } from '@storybook/react-vite'

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
} from './Breadcrumb'

const meta = {
    title: 'Componenten/Breadcrumb',
    component: Breadcrumb,
    parameters: { layout: 'centered' },
} satisfies Meta<typeof Breadcrumb>

export default meta

type Story = StoryObj<typeof meta>

function Example({
    size,
    iconHome = false,
}: {
    size: 's' | 'm'
    iconHome?: boolean
}) {
    return (
        <Breadcrumb size={size}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink
                        href="/"
                        aria-label={iconHome ? 'Home' : undefined}>
                        {iconHome ? <House /> : 'Home'}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/onderwerpen">
                        Onderwerpen
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/onderwerpen/digitaal-zuid-holland">
                        Digitaal Zuid-Holland
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbPage>Grenzeloos datalandschap</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export const Medium: Story = {
    render: () => <Example size="m" iconHome />,
}

export const Small: Story = {
    render: () => <Example size="s" />,
}

export const WithEllipsis: Story = {
    render: () => (
        <Breadcrumb size="m">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/onderwerpen">
                        Onderwerpen
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbPage>Grenzeloos datalandschap</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    ),
}
