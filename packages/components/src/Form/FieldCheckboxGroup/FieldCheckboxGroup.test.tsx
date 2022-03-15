import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import {
    FieldCheckboxGroup,
    FieldCheckboxGroupProps,
} from './FieldCheckboxGroup'

describe('FieldCheckboxGroup', () => {
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
