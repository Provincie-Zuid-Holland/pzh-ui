import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { FieldDate, FieldDateProps } from './FieldDate'

describe('FieldDate', () => {
    const defaultProps = {
        name: 'date',
        placeholderText: 'Date field',
    }

    const setup = (customProps?: Partial<FieldDateProps>) => {
        const onChange = vi.fn()

        const props = { ...defaultProps, ...customProps }
        render(<FieldDate onChange={onChange} {...props} />)
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByPlaceholderText('Date field')
        expect(element).toBeTruthy()
    })
})
