import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Modal, ModalProps } from './Modal'

describe('Modal', () => {
    const closeMock = jest.fn()
    const defaultProps = {
        open: true,
        onClose: closeMock,
        ariaLabel: 'test',
    }

    const setup = (customProps?: Partial<ModalProps>) => {
        const props = { ...defaultProps, ...customProps }

        render(
            <Modal {...props}>
                <span>Test Modal Text</span>
            </Modal>
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
