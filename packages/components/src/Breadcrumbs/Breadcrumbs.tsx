import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export interface BreadcrumbsProps {
    className?: string
    items: { name: string; path: string }[]
}

export const Breadcrumbs = ({ className, items = [] }: BreadcrumbsProps) => (
    <nav aria-label="Breadcrumb" className={`text-pzh-blue ${className}`}>
        <ol className="flex">
            {items.map((item, index) => {
                return index === items.length - 1 ? (
                    <li key={item.name} className="inline-block">
                        <span aria-current="page">{item.name}</span>
                    </li>
                ) : (
                    <li key={item.name} className="inline-block mr-2 font-bold">
                        <Link to={item.path}>{item.name}</Link>
                        <FontAwesomeIcon
                            aria-hidden
                            icon={faAngleRight}
                            className="text-xs ml-2 sr-hidden"
                        />
                    </li>
                )
            })}
        </ol>
    </nav>
)
