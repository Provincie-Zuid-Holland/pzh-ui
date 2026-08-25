import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'

function ExampleTabs({ onSelectionChange = vi.fn() }) {
    return (
        <Tabs defaultSelectedKey="one" onSelectionChange={onSelectionChange}>
            <TabsList aria-label="Example tabs">
                <TabsTrigger id="one">One</TabsTrigger>
                <TabsTrigger id="two">Two</TabsTrigger>
            </TabsList>
            <TabsContent id="one">First panel</TabsContent>
            <TabsContent id="two">Second panel</TabsContent>
        </Tabs>
    )
}

describe('Tabs', () => {
    it('changes the selected tab and panel', () => {
        const onSelectionChange = vi.fn()

        render(<ExampleTabs onSelectionChange={onSelectionChange} />)

        fireEvent.click(screen.getByRole('tab', { name: 'Two' }))

        expect(onSelectionChange).toHaveBeenCalledWith('two')
        expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute(
            'data-selected'
        )
        expect(screen.getByText('Second panel')).toBeVisible()
    })

    it('applies the horizontal line treatment', () => {
        const { container } = render(<ExampleTabs />)

        expect(container.querySelector('[data-slot="tabs-list"]')).toHaveClass(
            'group-data-[orientation=horizontal]/tabs:border-b',
            'group-data-[orientation=horizontal]/tabs:border-border'
        )
        expect(
            container.querySelector('[data-slot="tabs-trigger"]')
        ).toHaveClass(
            'group-data-[orientation=horizontal]/tabs:after:-bottom-px',
            'group-data-[orientation=horizontal]/tabs:after:h-0.75',
            'after:duration-200',
            'group-data-[orientation=horizontal]/tabs:after:origin-center',
            'group-data-[orientation=horizontal]/tabs:after:scale-x-0',
            'group-data-[orientation=horizontal]/tabs:data-selected:after:scale-x-100',
            'data-selected:text-success'
        )
    })

    it('applies the vertical line treatment', () => {
        const { container } = render(
            <Tabs orientation="vertical" defaultSelectedKey="one">
                <TabsList aria-label="Vertical tabs">
                    <TabsTrigger id="one">One</TabsTrigger>
                    <TabsTrigger id="two">Two</TabsTrigger>
                </TabsList>
                <TabsContent id="one">First panel</TabsContent>
                <TabsContent id="two">Second panel</TabsContent>
            </Tabs>
        )

        expect(container.querySelector('[data-slot="tabs"]')).toHaveAttribute(
            'data-orientation',
            'vertical'
        )
        expect(
            container.querySelector('[data-slot="tabs-trigger"]')
        ).toHaveClass(
            'group-data-[orientation=vertical]/tabs:flex-col',
            'group-data-[orientation=vertical]/tabs:after:left-0',
            'group-data-[orientation=vertical]/tabs:after:w-1',
            'group-data-[orientation=vertical]/tabs:after:origin-center',
            'group-data-[orientation=vertical]/tabs:after:scale-y-0',
            'group-data-[orientation=vertical]/tabs:data-selected:after:scale-y-100'
        )
    })

    it.each([
        ['m', 'group-data-[size=m]/tabs:text-xs'],
        ['l', 'group-data-[size=l]/tabs:text-s'],
    ] as const)('applies the %s size', (size, textClass) => {
        const { container } = render(
            <Tabs size={size} defaultSelectedKey="one">
                <TabsList aria-label="Sized tabs">
                    <TabsTrigger id="one">One</TabsTrigger>
                </TabsList>
                <TabsContent id="one">Panel</TabsContent>
            </Tabs>
        )

        expect(container.querySelector('[data-slot="tabs"]')).toHaveAttribute(
            'data-size',
            size
        )
        expect(
            container.querySelector('[data-slot="tabs-trigger"]')
        ).toHaveClass(textClass)
    })
})
