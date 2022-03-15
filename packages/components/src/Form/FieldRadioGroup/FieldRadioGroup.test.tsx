import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { FieldRadioGroup, FieldRadioGroupProps } from './FieldRadioGroup'

describe('FieldRadioGroup', () => {
    const defaultProps = {
        options: [
            {
                name: 'option',
                label: 'Option 1',
                id: 'option-1',
            },
            {
                name: 'option',
                label: 'Option 2',
                id: 'option-2',
            },
        ],
    }

    const setup = (customProps?: Partial<FieldRadioGroupProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<FieldRadioGroup {...props} />)
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByText('Option 1')
        expect(element).toBeTruthy()
    })
})
