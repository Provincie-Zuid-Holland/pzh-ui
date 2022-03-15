import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { FieldLabel, FieldLabelProps } from './FieldLabel'

describe('FieldLabel', () => {
    const defaultProps = {
        label: 'Label',
        name: 'option',
    }

    const setup = (customProps?: Partial<FieldLabelProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<FieldLabel {...props} />)
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByText('Label')
        expect(element).toBeTruthy()
    })

    it('renders with asterix when required', () => {
        setup({ required: true })

        const element = screen.getByText('*')
        expect(element).toBeTruthy()
    })

    it('renders with description when provided', () => {
        setup({ description: 'description here' })

        const element = screen.getByText('description here')
        expect(element).toBeTruthy()
    })
})
