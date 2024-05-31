import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './Accordion'

describe('Accordion', () => {
    const setup = () => {
        render(
            <Accordion type="single">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Item 1</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Item 2</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        )
    }

    it('Component renders', () => {
        setup()

        const firstEl = screen.getByText('Item 1')
        expect(firstEl).toBeTruthy()
    })
})
