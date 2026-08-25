import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './Pagination'

describe('Pagination', () => {
    it('renders accessible pagination links', () => {
        render(
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="?page=1" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="?page=1" isActive>
                            1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="?page=2" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        )

        expect(
            screen.getByRole('navigation', { name: 'pagination' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('link', { name: 'Ga naar de vorige pagina' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('link', { name: 'Ga naar de volgende pagina' })
        ).toBeInTheDocument()
    })

    it('marks and styles the active page', () => {
        render(
            <PaginationLink href="?page=2" isActive>
                2
            </PaginationLink>
        )

        expect(screen.getByRole('link', { name: '2' })).toHaveAttribute(
            'aria-current',
            'page'
        )
        expect(screen.getByRole('link', { name: '2' })).toHaveClass(
            'border-primary',
            'bg-background',
            'text-primary'
        )
    })

    it('includes the designed interaction states', () => {
        render(<PaginationPrevious href="?page=1" />)

        expect(
            screen.getByRole('link', { name: 'Ga naar de vorige pagina' })
        ).toHaveClass(
            'text-primary',
            'hover:border-success',
            'hover:text-success',
            'focus-visible:border-focus',
            'focus-visible:ring-3',
            'active:bg-primary-active',
            'active:text-primary-foreground',
            'data-disabled:text-text-disabled'
        )
    })

    it('renders the horizontal ellipsis', () => {
        const { container } = render(<PaginationEllipsis />)

        expect(
            container.querySelector('[data-slot="pagination-ellipsis"]')
        ).toHaveTextContent("Meer pagina's")
    })

    it('supports disabled boundary controls', () => {
        render(<PaginationPrevious href="?page=1" isDisabled />)

        expect(
            screen.getByRole('link', { name: 'Ga naar de vorige pagina' })
        ).toHaveAttribute('data-disabled')
    })

    it('supports rendering a custom link component', () => {
        render(
            <PaginationLink
                render={props => (
                    <a
                        href="/resultaten?page=2"
                        data-router-link="true"
                        className={props.className}>
                        {props.children}
                    </a>
                )}>
                2
            </PaginationLink>
        )

        expect(screen.getByRole('link', { name: '2' })).toHaveAttribute(
            'data-router-link',
            'true'
        )
    })
})
