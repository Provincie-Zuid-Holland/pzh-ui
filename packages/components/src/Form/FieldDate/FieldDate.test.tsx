import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { FieldDate, FieldDateProps } from './FieldDate'

describe('FieldDate', () => {
    const defaultProps = {
        name: 'date',
        placeholderText: 'Date field',
        onChange: vi.fn(),
    }

    const setup = (customProps?: Partial<FieldDateProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<FieldDate {...(props as FieldDateProps)} />)
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByPlaceholderText('Date field')
        expect(element).toBeTruthy()
    })
})
