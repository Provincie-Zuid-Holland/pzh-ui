import { House } from '@pzh-ui/icons'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
} from './Breadcrumb'

function Example({ size = 'm' }: { size?: 's' | 'm' }) {
    return (
        <Breadcrumb size={size}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbPage>Current page</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}

describe('Breadcrumb', () => {
    it.each([
        ['s', 'group-data-[size=s]/breadcrumb:text-s'],
        ['m', 'group-data-[size=m]/breadcrumb:text-m'],
    ] as const)('supports the %s size', (size, textClass) => {
        const { container } = render(<Example size={size} />)

        expect(
            container.querySelector('[data-slot="breadcrumb"]')
        ).toHaveAttribute('data-size', size)
        expect(
            container.querySelector('[data-slot="breadcrumb-list"]')
        ).toHaveClass(textClass)
    })

    it('styles links and the current page', () => {
        render(<Example />)

        expect(screen.getByRole('link', { name: 'Home' })).toHaveClass(
            'text-primary'
        )
        expect(screen.getByText('Current page')).toHaveClass('text-text-muted')
        expect(screen.getByText('Current page')).toHaveAttribute(
            'aria-current',
            'page'
        )
    })

    it('supports an icon-only link with an accessible name', () => {
        render(
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" aria-label="Home">
                            <House />
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        )

        expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    })
})
