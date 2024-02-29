import { AngleLeft } from '@pzh-ui/icons'
import classNames from 'clsx'
import { Link, LinkProps } from 'react-router-dom'

export interface BackLinkProps extends LinkProps {
    label?: string
    className?: string
}

export const BackLink = ({ to, label = 'Terug', className }: BackLinkProps) => (
    <Link
        to={to}
        className={classNames(
            'text-pzh-blue-dark flex items-center',
            className
        )}
        data-testid="back-link">
        <AngleLeft className="-mt-[2px] mr-2" />
        {label}
    </Link>
)
