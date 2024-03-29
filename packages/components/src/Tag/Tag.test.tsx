import { fireEvent, render, screen } from '@testing-library/react'

import { Tag, TagProps } from './Tag'

describe('Tag', () => {
    const clickTag = vi.fn()
    const defaultProps = {
        text: 'Tag',
        className: '',
    }

    const setup = (customProps?: Partial<TagProps>) => {
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
