import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { FieldRadio, FieldRadioProps } from './FieldRadio'

describe('FieldRadio', () => {
    const defaultProps = {
        label: 'Option',
        id: 'option',
    }

    const setup = (customProps?: Partial<FieldRadioProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(<FieldRadio {...props} />)
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByText('Option')
        expect(element).toBeTruthy()
    })
})
