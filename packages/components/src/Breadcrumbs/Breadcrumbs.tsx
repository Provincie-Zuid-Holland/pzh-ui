import { Link } from 'react-router-dom'

import { AngleRight } from '@pzh-ui/icons'

import { BackLink } from '../BackLink'

export interface BreadcrumbsProps {
    className?: string
    items: {
        name: string
        path: string
    }[]
}

export const Breadcrumbs = ({ className, items = [] }: BreadcrumbsProps) => (
    <nav
        aria-label="Broodkruimelpad"
        className={`text-pzh-blue-dark text-s w-full ${className}`}>
        <ol className="hidden md:flex">
            {items.map((item, index) => {
                return index === items.length - 1 ? (
                    <li
                        key={item.name + index}
                        className="inline-block truncate">
                        <span aria-current="page">{item.name}</span>
                    </li>
                ) : (
                    <li
                        key={item.name + index}
                        className="mr-2 flex items-center whitespace-nowrap underline underline-offset-2">
                        <Link to={item.path} className="mr-2">
                            {item.name}
                        </Link>
                        <AngleRight className="sr-hidden -mt-0.5" aria-hidden />
                    </li>
                )
            })}
        </ol>
        <BackLink
            to={items[items.length - 2].path}
            label={items[items.length - 2].name}
            className="block md:hidden"
        />
    </nav>
)
