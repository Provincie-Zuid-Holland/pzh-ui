import { render, screen } from '@testing-library/react'

import { FieldRte } from './FieldRte'

describe('FieldRte', () => {
    const defaultProps = {
        name: 'field-rte',
        onChange: () => null,
        value: 'InitialValue',
    }

    it('should render', () => {
        const props = { ...defaultProps }
        render(<FieldRte {...props} />)

        expect(screen.getByText('InitialValue')).toBeTruthy()
    })
})
