import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { cloneElement, useState } from 'react'

import { FieldTextArea } from './FieldTextArea'

const ParentWrapper = ({
    children,
    initEmpty,
}: {
    children: any
    initEmpty?: boolean
}) => {
    const [value, setValue] = useState(initEmpty ? '' : 'Test Value')

    const handleChange = vi.fn(e => {
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

describe('FieldTextArea', () => {
    const setup = (initEmpty?: boolean, disabled?: boolean) => {
        const testid = 'pzh-form-textarea'

        render(
            <ParentWrapper initEmpty={initEmpty}>
                <FieldTextArea name={testid} disabled={disabled} />
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
