import { render, screen } from '@testing-library/react'

import { FieldRteDeprecated } from './FieldRte'

describe('FieldRte', () => {
    const defaultProps = {
        name: 'field-rte',
        onChange: () => null,
        value: 'InitialValue',
    }

    it('should render', () => {
        const props = { ...defaultProps }
        render(<FieldRteDeprecated {...props} />)

        expect(screen.getByText('InitialValue')).toBeTruthy()
    })
})
