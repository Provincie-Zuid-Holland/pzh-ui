import { render } from '@testing-library/react'

import { Heading } from './Heading'

describe('Heading', () => {
    const setup = () => {
        render(<Heading>Heading</Heading>)
    }

    it('Component renders', () => {
        setup()
    })
})
