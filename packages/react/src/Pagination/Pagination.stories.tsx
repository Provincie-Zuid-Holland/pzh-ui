import type { Meta, StoryObj } from '@storybook/react-vite'
import { RouterProvider } from 'react-aria-components'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './Pagination'

const meta = {
    title: 'Componenten/Pagination',
    component: Pagination,
    parameters: { layout: 'centered' },
    decorators: [
        Story => (
            <RouterProvider navigate={() => undefined}>
                <Story />
            </RouterProvider>
        ),
    ],
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

function Page({ page, current }: { page: number; current?: boolean }) {
    return (
        <PaginationItem>
            <PaginationLink
                href={`?page=${page}`}
                isActive={current}
                aria-label={`Ga naar pagina ${page}`}>
                {page}
            </PaginationLink>
        </PaginationItem>
    )
}

export const Default: Story = {
    render: () => (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="?page=1" />
                </PaginationItem>
                {[1, 2, 3, 4, 5, 6, 7].map(page => (
                    <Page key={page} page={page} />
                ))}
                <PaginationItem>
                    <PaginationNext href="?page=2" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    ),
}

export const WithEllipsis: Story = {
    render: () => (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="?page=40" />
                </PaginationItem>
                <Page page={1} />
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <Page page={39} />
                <Page page={40} />
                <Page page={41} current />
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <Page page={80} />
                <PaginationItem>
                    <PaginationNext href="?page=42" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    ),
}

export const FirstPage: Story = {
    render: () => (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="?page=1" isDisabled />
                </PaginationItem>
                <Page page={1} current />
                <Page page={2} />
                <Page page={3} />
                <PaginationItem>
                    <PaginationNext href="?page=2" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    ),
}

export const LastPage: Story = {
    render: () => (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="?page=22" />
                </PaginationItem>
                <Page page={1} />
                <Page page={2} />
                <Page page={3} />
                <Page page={4} />
                <Page page={5} />
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <Page page={20} />
                <Page page={21} />
                <Page page={22} />
                <Page page={23} />
                <Page page={24} current />
                <PaginationItem>
                    <PaginationNext href="?page=24" isDisabled />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    ),
}

export const States: Story = {
    render: () => (
        <div className="gap-x-8 gap-y-4 grid grid-cols-[auto_auto] items-center">
            <span>Default</span>
            <PaginationPrevious href="?page=1" />

            <span>Selected</span>
            <PaginationPrevious href="?page=1" isActive />

            <span>Disabled</span>
            <PaginationPrevious href="?page=1" isDisabled />

            <span>Hover</span>
            <PaginationPrevious
                href="?page=1"
                className="border-success bg-background text-success"
            />

            <span>Focus</span>
            <PaginationPrevious
                href="?page=1"
                className="border-transparent bg-background text-primary ring-2 ring-focus"
            />

            <span>Active</span>
            <PaginationPrevious
                href="?page=1"
                className="border-primary-active bg-primary-active text-primary-foreground"
            />
        </div>
    ),
}
