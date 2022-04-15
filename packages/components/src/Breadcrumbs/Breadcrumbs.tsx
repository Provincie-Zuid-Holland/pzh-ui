import { AngleRight } from '@pzh-ui/icons'
import { Link } from 'react-router-dom'

import { BackLink } from '../BackLink'

export interface BreadcrumbsProps {
    className?: string
    items: { name: string; path: string }[]
}

export const Breadcrumbs = ({ className, items = [] }: BreadcrumbsProps) => (
    <nav aria-label="Breadcrumb" className={`text-pzh-blue ${className}`}>
        <ol className="hidden md:flex">
            {items.map((item, index) => {
                return index === items.length - 1 ? (
                    <li key={item.name} className="inline-block">
                        <span aria-current="page">{item.name}</span>
                    </li>
                ) : (
                    <li
                        key={item.name}
                        className="flex items-center mr-2 font-bold">
                        <Link to={item.path}>{item.name}</Link>
                        <AngleRight
                            className="ml-2 -mt-[2px] sr-hidden"
                            aria-hidden
                        />
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
