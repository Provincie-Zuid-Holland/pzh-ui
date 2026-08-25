import '@testing-library/jest-dom/vitest'

import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Tag } from './Tag'

describe('Tag', () => {
    it('renders with default variant and size', () => {
        render(<Tag>Tag</Tag>)

        const tag = screen.getByTestId('tag')

        expect(tag).toBeInTheDocument()
        expect(tag).toHaveTextContent('Tag')
        expect(tag).toHaveAttribute('data-variant', 'primary')
        expect(tag).toHaveAttribute('data-size', 'm')
        expect(tag).toHaveClass(
            'border-primary',
            'bg-primary',
            'text-primary-foreground',
            'h-8',
            'gap-2',
            'px-2',
            'text-s'
        )
    })

    it.each([
        {
            variant: 'primary' as const,
            expectedClasses: [
                'border-primary',
                'bg-primary',
                'text-primary-foreground',
                'hover:bg-background',
                'hover:text-primary',
                'active:border-foreground',
                'active:bg-foreground',
            ],
        },
        {
            variant: 'secondary' as const,
            expectedClasses: [
                'border-primary',
                'bg-background',
                'text-primary',
                'hover:border-success',
                'hover:text-success',
                'active:border-success',
                'active:bg-success',
            ],
        },
        {
            variant: 'diapositive' as const,
            expectedClasses: [
                'border-background',
                'bg-background',
                'text-primary',
                'hover:text-success',
                'active:bg-background',
                'active:text-primary',
            ],
        },
    ])(
        'applies the $variant variant classes',
        ({ variant, expectedClasses }) => {
            render(<Tag variant={variant}>Tag</Tag>)

            expect(screen.getByTestId('tag')).toHaveClass(...expectedClasses)
        }
    )

    it.each([
        {
            size: 'l' as const,
            expectedClasses: ['h-10', 'gap-3', 'px-4', 'text-m'],
        },
        {
            size: 'm' as const,
            expectedClasses: ['h-8', 'gap-2', 'px-2', 'text-s'],
        },
        {
            size: 's' as const,
            expectedClasses: ['h-6', 'gap-2', 'px-2', 'text-xs'],
        },
    ])('applies the $size size classes', ({ size, expectedClasses }) => {
        render(<Tag size={size}>Tag</Tag>)

        expect(screen.getByTestId('tag')).toHaveClass(...expectedClasses)
        expect(screen.getByTestId('tag')).toHaveAttribute('data-size', size)
    })

    it('renders without a remove button by default', () => {
        render(<Tag>Tag</Tag>)

        expect(
            screen.queryByRole('button', {
                name: 'Verwijderen',
            })
        ).not.toBeInTheDocument()
    })

    it('renders a remove button when onRemove is provided', () => {
        render(<Tag onRemove={() => undefined}>Tag</Tag>)

        expect(
            screen.getByRole('button', {
                name: 'Verwijderen',
            })
        ).toBeInTheDocument()
    })

    it('calls onRemove when the remove button is pressed', () => {
        const onRemove = vi.fn()

        render(<Tag onRemove={onRemove}>Tag</Tag>)

        fireEvent.click(
            screen.getByRole('button', {
                name: 'Verwijderen',
            })
        )

        expect(onRemove).toHaveBeenCalledTimes(1)
    })

    it('uses a custom remove label', () => {
        render(
            <Tag onRemove={() => undefined} removeLabel="Filter verwijderen">
                Tag
            </Tag>
        )

        expect(
            screen.getByRole('button', {
                name: 'Filter verwijderen',
            })
        ).toBeInTheDocument()
    })

    it('sets the correct data slots', () => {
        render(<Tag onRemove={() => undefined}>Tag</Tag>)

        const tag = screen.getByTestId('tag')
        const label = tag.querySelector('[data-slot="tag-label"]')
        const remove = tag.querySelector('[data-slot="tag-remove"]')

        expect(tag).toHaveAttribute('data-slot', 'tag')
        expect(label).toBeInTheDocument()
        expect(remove).toBeInTheDocument()
    })

    it('applies the remove button sizing classes', () => {
        render(<Tag onRemove={() => undefined}>Tag</Tag>)

        const removeButton = screen.getByRole('button', {
            name: 'Verwijderen',
        })

        expect(removeButton).toHaveClass(
            'group-data-[size=l]/tag:size-6',
            'group-data-[size=m]/tag:size-5',
            'group-data-[size=s]/tag:size-4',
            'group-data-[size=l]/tag:[&>svg]:size-3.5',
            'group-data-[size=m]/tag:[&>svg]:size-3',
            'group-data-[size=s]/tag:[&>svg]:size-2.5'
        )
    })

    it('merges a custom class name', () => {
        render(<Tag className="custom-tag-class">Tag</Tag>)

        expect(screen.getByTestId('tag')).toHaveClass('custom-tag-class')
    })

    it('forwards native span attributes', () => {
        render(
            <Tag id="tag-id" aria-label="Tag label">
                Tag
            </Tag>
        )

        const tag = screen.getByTestId('tag')

        expect(tag).toHaveAttribute('id', 'tag-id')
        expect(tag).toHaveAttribute('aria-label', 'Tag label')
    })

    it('renders arbitrary children', () => {
        render(
            <Tag>
                <span data-slot="custom-child">Custom content</span>
            </Tag>
        )

        expect(screen.getByTestId('custom-child')).toBeInTheDocument()
    })
})
