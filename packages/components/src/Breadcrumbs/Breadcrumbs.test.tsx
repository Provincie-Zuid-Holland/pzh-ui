import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import {
    BreadCrumbsList,
    BreadcrumbItem,
    Breadcrumbs,
    BreadcrumbsProps,
} from './Breadcrumbs'

describe('Breadcrumbs', () => {
    const defaultProps = {
        items: [
            { name: 'Home', path: '/' },
            { name: 'Another page', path: '/' },
            {
                name: 'Digitale toegankelijkheid',
                path: '/digi-toegankelijkheid',
            },
        ],
    }

    const setup = (customProps?: Partial<BreadcrumbsProps>) => {
        const props = { ...defaultProps, ...customProps }

        render(
            <Breadcrumbs>
                <BreadCrumbsList>
                    {props.items.map(item => (
                        <BreadcrumbItem key={item.name} href={item.path}>
                            {item.name}
                        </BreadcrumbItem>
                    ))}
                </BreadCrumbsList>
            </Breadcrumbs>
        )
    }

    it('Component renders', () => {
        setup()

        const firstEl = screen.getByText('Home')
        expect(firstEl).toBeTruthy()

        const secondEl = screen.getAllByText('Another page')[0]
        expect(secondEl).toBeTruthy()

        const thirdEl = screen.getByText('Digitale toegankelijkheid')
        expect(thirdEl).toBeTruthy()
    })
})
