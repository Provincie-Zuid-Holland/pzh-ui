import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Field, FieldDescription, FieldError, FieldLabel } from './Field'

describe('Field', () => {
    it('renders the field container', () => {
        render(
            <Field>
                <span>Content</span>
            </Field>
        )

        expect(screen.getByTestId('field')).toBeInTheDocument()
        expect(screen.getByRole('group')).toHaveTextContent('Content')
    })

    it('applies a custom className', () => {
        render(<Field className="custom-class" />)

        expect(screen.getByTestId('field')).toHaveClass('custom-class')
    })
})

describe('FieldLabel', () => {
    it('renders the label', () => {
        render(<FieldLabel>Naam</FieldLabel>)

        expect(screen.getByTestId('field-label')).toHaveTextContent('Naam')
    })

    it('renders the required indicator when required is true', () => {
        render(<FieldLabel required>Naam</FieldLabel>)

        expect(screen.getByTestId('field-label')).toHaveTextContent('Naam*')
    })

    it('does not render the required indicator by default', () => {
        render(<FieldLabel>Naam</FieldLabel>)

        expect(screen.getByTestId('field-label')).toHaveTextContent('Naam')
        expect(screen.getByTestId('field-label')).not.toHaveTextContent('Naam*')
    })

    it('applies a custom className', () => {
        render(<FieldLabel className="custom-class">Naam</FieldLabel>)

        expect(screen.getByTestId('field-label')).toHaveClass('custom-class')
    })

    it('forwards label props', () => {
        render(
            <>
                <FieldLabel htmlFor="name">Naam</FieldLabel>
                <input id="name" />
            </>
        )

        expect(screen.getByTestId('field-label')).toHaveAttribute('for', 'name')
    })
})

describe('FieldDescription', () => {
    it('renders the description', () => {
        render(<FieldDescription>Vul je volledige naam in.</FieldDescription>)

        expect(screen.getByTestId('field-description')).toHaveTextContent(
            'Vul je volledige naam in.'
        )
    })

    it('applies a custom className', () => {
        render(
            <FieldDescription className="custom-class">
                Beschrijving
            </FieldDescription>
        )

        expect(screen.getByTestId('field-description')).toHaveClass(
            'custom-class'
        )
    })

    it('forwards HTML props', () => {
        render(
            <FieldDescription id="description">Beschrijving</FieldDescription>
        )

        expect(screen.getByTestId('field-description')).toHaveAttribute(
            'id',
            'description'
        )
    })
})

describe('FieldError', () => {
    it('does not render when no content or errors are provided', () => {
        render(<FieldError />)

        expect(screen.queryByTestId('field-error')).not.toBeInTheDocument()
    })

    it('renders children as the error content', () => {
        render(<FieldError>Dit veld is verplicht.</FieldError>)

        expect(screen.getByTestId('field-error')).toBeInTheDocument()
        expect(screen.getByTestId('field-error')).toHaveTextContent(
            'Dit veld is verplicht.'
        )
    })

    it('renders a single error message', () => {
        render(
            <FieldError
                errors={[
                    {
                        message: 'Dit veld is verplicht.',
                    },
                ]}
            />
        )

        expect(screen.getByTestId('field-error')).toHaveTextContent(
            'Dit veld is verplicht.'
        )
    })

    it('renders multiple error messages as a list', () => {
        render(
            <FieldError
                errors={[
                    {
                        message: 'Dit veld is verplicht.',
                    },
                    {
                        message: 'De waarde is ongeldig.',
                    },
                ]}
            />
        )

        expect(screen.getByText('Dit veld is verplicht.')).toBeInTheDocument()

        expect(screen.getByText('De waarde is ongeldig.')).toBeInTheDocument()

        expect(screen.getByRole('list')).toBeInTheDocument()
        expect(screen.getAllByRole('listitem')).toHaveLength(2)
    })

    it('removes duplicate error messages', () => {
        render(
            <FieldError
                errors={[
                    {
                        message: 'Dit veld is verplicht.',
                    },
                    {
                        message: 'Dit veld is verplicht.',
                    },
                    {
                        message: 'De waarde is ongeldig.',
                    },
                ]}
            />
        )

        expect(screen.getAllByText('Dit veld is verplicht.')).toHaveLength(1)

        expect(screen.getByText('De waarde is ongeldig.')).toBeInTheDocument()

        expect(screen.getAllByRole('listitem')).toHaveLength(2)
    })

    it('prefers children over the errors prop', () => {
        render(
            <FieldError
                errors={[
                    {
                        message: 'Error uit errors prop',
                    },
                ]}>
                Error uit children
            </FieldError>
        )

        expect(screen.getByTestId('field-error')).toHaveTextContent(
            'Error uit children'
        )

        expect(
            screen.queryByText('Error uit errors prop')
        ).not.toBeInTheDocument()
    })

    it('ignores errors without a message', () => {
        render(
            <FieldError
                errors={[
                    undefined,
                    {},
                    {
                        message: 'Geldige foutmelding',
                    },
                ]}
            />
        )

        expect(screen.getByTestId('field-error')).toHaveTextContent(
            'Geldige foutmelding'
        )
    })

    it('has alert semantics', () => {
        render(<FieldError>Er is iets misgegaan.</FieldError>)

        expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('applies a custom className', () => {
        render(
            <FieldError className="custom-class">
                Er is iets misgegaan.
            </FieldError>
        )

        expect(screen.getByTestId('field-error')).toHaveClass('custom-class')
    })
})
