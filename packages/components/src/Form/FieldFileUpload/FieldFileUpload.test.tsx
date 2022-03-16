import { render, screen } from '@testing-library/react'

import { FieldFileUpload } from './FieldFileUpload'

describe('FieldFileUpload', () => {
    const defaultProps = {
        name: 'field-file-upload',
        onChange: () => {},
    }

    it('should render', () => {
        const props = { ...defaultProps }
        render(<FieldFileUpload {...props} />)

        expect(
            screen.getByText('Sleep hier je bestanden naartoe of')
        ).toBeTruthy()
    })
})
