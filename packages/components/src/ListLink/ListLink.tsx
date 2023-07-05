import { Link } from 'react-router-dom'
import { AngleRight } from '@pzh-ui/icons'
import classNames from 'classnames'

export interface ListLinkProps {
    text: string
    to: string
    className?: string
}

export const ListLink = ({ text, to, className }: ListLinkProps) => {
    return (
        <Link
            className={classNames(
                'inline-flex items-start underline decoration-1 ',
                {
                    'text-pzh-blue-dark hover:text-pzh-green': !className,
                },
                className
            )}
            to={to}>
            <AngleRight className="mr-2 relative -bottom-[6px] min-w-[14px]" />
            <span>{text}</span>
        </Link>
    )
}
