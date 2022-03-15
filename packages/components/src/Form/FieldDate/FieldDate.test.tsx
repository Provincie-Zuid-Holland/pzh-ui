import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { FieldDate, FieldDateProps } from './FieldDate'

describe('FieldDate', () => {
    const defaultProps = {
        name: 'select',
        placeholder: 'Select field',
    }

    const setup = (customProps?: Partial<FieldDateProps>) => {
        const onChange = jest.fn()

        const props = { ...defaultProps, ...customProps }
        render(<FieldDate onChange={onChange} {...props} />)
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByText('Select field')
        expect(element).toBeTruthy()
    })
})
