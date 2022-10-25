import { render, screen } from '@testing-library/react'

import { Tabs, TabItem, TabsProps } from './Tabs'

describe('Tabs', () => {
    const defaultProps = {}

    const setup = (customProps?: Partial<TabsProps>) => {
        const props = { ...defaultProps, ...customProps }
        render(
            <Tabs {...props}>
                <TabItem title="Tab 1">Tab 1</TabItem>
                <TabItem title="Tab 2">Tab 2</TabItem>
                <TabItem title="Tab 3">Tab 3</TabItem>
            </Tabs>
        )
    }

    it('Component renders', () => {
        setup()

        const element = screen.getByTestId('tabs')
        expect(element).toBeTruthy()
    })
})
