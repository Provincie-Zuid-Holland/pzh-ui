import { Link } from 'react-router-dom'
import { AngleRight } from '@pzh-ui/icons'

export interface ListLinkProps {
    text: string
    to: string
}

export const ListLink = ({ text, to }: ListLinkProps) => {
    return (
        <Link
            className="inline-flex items-center underline text-pzh-blue-dark hover:text-pzh-green"
            to={to}>
            <AngleRight className="mr-2 -mt-[2px]" />
            <span>{text}</span>
        </Link>
    )
}
