import { render, screen, fireEvent } from '@testing-library/react'

import { Tag } from './Tag'

describe('Tag', () => {
    const clickTag = jest.fn()
    const defaultProps = {
        text: 'Tag',
        className: '',
    }

    const setup = (customProps?: any) => {
        const props = { ...defaultProps, ...customProps }
        render(<Tag {...props} />)
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByTestId('tag')
        expect(element).toBeTruthy()
    })

    it('Component is clickable', () => {
        setup({ onClick: clickTag })

        const element = screen.getByTestId('tag')
        expect(element).toBeTruthy()

        fireEvent.click(element)
        expect(clickTag).toHaveBeenCalledTimes(1)
    })
})
