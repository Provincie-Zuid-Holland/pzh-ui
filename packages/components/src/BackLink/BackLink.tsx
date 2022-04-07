import { faAngleLeft } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { Link, LinkProps } from 'react-router-dom'

export interface BackLinkProps extends LinkProps {
    label?: string
    className?: string
}

export const BackLink = ({ to, label = 'Terug', className }: BackLinkProps) => (
    <Link
        to={to}
        className={classNames(
            'flex items-center text-pzh-blue-dark',
            className
        )}
        data-testid="back-link">
        <FontAwesomeIcon icon={faAngleLeft} className="mr-2 -mt-[2px]" />
        {label}
    </Link>
)
