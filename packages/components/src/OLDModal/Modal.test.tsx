import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { OLDModal, OLDModalProps } from './Modal'

describe('Modal', () => {
    const closeMock = jest.fn()
    const defaultProps = {
        open: true,
        onClose: closeMock,
        closeButton: true,
        ariaLabel: 'test',
    }

    const setup = (customProps?: Partial<OLDModalProps>) => {
        const props = { ...defaultProps, ...customProps }

        render(
            <OLDModal {...props}>
                <span>Test Modal Text</span>
            </OLDModal>
        )
    }

    it('Component renders content and can be closed', () => {
        setup()

        const children = screen.getByText('Test Modal Text')
        expect(children).toBeTruthy()

        const closeBtn = screen.getByRole('button')
        expect(closeBtn).toBeTruthy()
        fireEvent.click(closeBtn)
        expect(closeMock).toHaveBeenCalledTimes(1)
    })
})
