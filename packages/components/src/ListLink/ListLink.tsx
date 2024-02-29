import { AngleRight } from '@pzh-ui/icons'
import classNames from 'clsx'
import { Link } from 'react-router-dom'

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
            <AngleRight className="relative -bottom-[6px] mr-2 min-w-[14px]" />
            <span>{text}</span>
        </Link>
    )
}
