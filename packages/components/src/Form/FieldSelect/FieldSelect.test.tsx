import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { FieldSelect, FieldSelectProps } from './FieldSelect'

describe('FieldSelect', () => {
    const defaultProps = {
        name: 'select',
        placeholder: 'Select field',
        options: [
            {
                label: 'Option 1',
                value: 'option-1',
            },
            {
                label: 'Option 2',
                value: 'option-2',
            },
            {
                label: 'Option 3',
                value: 'option-3',
            },
        ],
    }

    const setup = (customProps?: Partial<FieldSelectProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<FieldSelect {...props} />)
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByText('Select field')
        expect(element).toBeTruthy()
    })
})
