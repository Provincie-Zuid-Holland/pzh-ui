import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import {
    FieldCheckboxGroup,
    FieldCheckboxGroupProps,
} from './FieldCheckboxGroup'

describe('FieldCheckboxGroup', () => {
    const defaultProps = {
        name: 'option',
        value: [],
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

    const setup = (customProps?: Partial<FieldCheckboxGroupProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<FieldCheckboxGroup {...props} />)
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByText('Option 1')
        expect(element).toBeTruthy()
    })
})
