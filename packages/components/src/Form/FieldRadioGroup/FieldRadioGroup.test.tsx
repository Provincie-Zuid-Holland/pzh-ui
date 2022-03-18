import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { FieldRadioGroup, FieldRadioGroupProps } from './FieldRadioGroup'

describe('FieldRadioGroup', () => {
    const defaultProps = {
        name: 'option',
        options: [
            {
                label: 'Option 1',
                value: 'option-1',
            },
            {
                label: 'Option 2',
                value: 'option-2',
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
