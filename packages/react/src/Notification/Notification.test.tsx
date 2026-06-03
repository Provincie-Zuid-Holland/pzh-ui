import { render, screen } from '@testing-library/react'
import { Notification } from './Notification'

describe('Notification', () => {
    it('renders the title', () => {
        render(<Notification title="Info message" />)

        expect(screen.getByText('Info message')).toBeInTheDocument()
    })

    it('renders children when provided', () => {
        render(
            <Notification title="Warning">
                This is the notification body.
            </Notification>
        )

        expect(screen.getByText('Warning')).toBeInTheDocument()
        expect(
            screen.getByText('This is the notification body.')
        ).toBeInTheDocument()
    })

    it('does not render body text when children are not provided', () => {
        render(<Notification title="Only title" />)

        expect(screen.getByText('Only title')).toBeInTheDocument()
    })

    it.each([
        ['info', 'bg-pzh-blue-10', 'border-pzh-blue-100'],
        ['warning', 'bg-pzh-yellow-10', 'border-pzh-yellow-100'],
        ['positive', 'bg-pzh-green-10', 'border-pzh-green-100'],
        ['negative', 'bg-pzh-red-10', 'border-pzh-red-100'],
    ] as const)(
        'applies %s variant classes',
        (variant, bgClass, borderClass) => {
            const { container } = render(
                <Notification variant={variant} title="Notification" />
            )

            expect(container.firstChild).toHaveClass(bgClass)
            expect(container.firstChild).toHaveClass(borderClass)
        }
    )

    it.each([
        ['m', 'p-4'],
        ['s', 'px-4', 'py-2'],
        ['xs', 'px-2', 'py-1'],
    ] as const)('applies %s size classes', (size, ...classes) => {
        const { container } = render(
            <Notification size={size} title="Notification" />
        )

        expect(container.firstChild).toHaveClass(...classes)
    })

    it('applies a custom className', () => {
        const { container } = render(
            <Notification title="Custom" className="my-custom-class" />
        )

        expect(container.firstChild).toHaveClass('my-custom-class')
    })
})
