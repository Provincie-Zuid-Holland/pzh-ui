import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { cloneElement, useState } from 'react'

import { FieldInput } from './FieldInput'

const ParentWrapper = ({
    children,
    initEmpty,
}: {
    children: any
    initEmpty?: boolean
}) => {
    const [value, setValue] = useState(initEmpty ? '' : 'Test Value')

    const handleChange = jest.fn(e => {
        setValue(e.target.value)
    })

    return (
        <div>
            {cloneElement(children, {
                defaultValue: value,
                onChange: handleChange,
            })}
        </div>
    )
}

describe('FieldInput', () => {
    const setup = (initEmpty?: boolean, disabled?: boolean) => {
        const testid = 'pzh-form-input'

        render(
            <ParentWrapper initEmpty={initEmpty}>
                <FieldInput name={testid} disabled={disabled} />
            </ParentWrapper>
        )

        const input = screen.getByTestId(testid) as HTMLInputElement

        return { input }
    }

    it('should render', () => {
        const { input } = setup()
        expect(input).toBeTruthy()
    })

    it('should contain a prefilled in value if provided', () => {
        const { input } = setup()
        expect(input).toHaveValue('Test Value')
    })

    it('element should be disabled when the disabled prop is true', () => {
        const { input } = setup(true, true)
        expect(input).toBeDisabled()
    })
})
