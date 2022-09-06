import { Link } from 'react-router-dom'
import { AngleRight } from '@pzh-ui/icons'

export interface ListLinkProps {
    text: string
    to: string
}

export const ListLink = ({ text, to }: ListLinkProps) => {
    return (
        <Link
            className="inline-flex items-start underline decoration-1 text-pzh-blue-dark hover:text-pzh-green"
            to={to}>
            <AngleRight className="mr-2 relative -bottom-[6px]" />
            <span>{text}</span>
        </Link>
    )
}
