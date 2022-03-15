import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { FieldCheckbox, FieldCheckboxProps } from './FieldCheckbox'

describe('FieldCheckbox', () => {
    const defaultProps = {
        label: 'Option',
        id: 'option',
    }

    const setup = (customProps?: Partial<FieldCheckboxProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<FieldCheckbox {...props} />)
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByText('Option')
        expect(element).toBeTruthy()
    })
})
