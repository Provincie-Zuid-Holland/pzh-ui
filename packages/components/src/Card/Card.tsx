import classNames from 'classnames'
import { FC } from 'react'

export interface CardProps {
    className?: string
}

export const Card: FC<CardProps> = ({ className = '', children }) => (
    <div
        className={classNames('p-6 bg-white rounded shadow-md', className)}
        data-testid="card">
        {children}
    </div>
)
