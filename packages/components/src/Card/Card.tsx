import classNames from 'classnames'
import { ReactNode } from 'react'

export interface CardProps {
    className?: string
    children: ReactNode
}

export const Card = ({ className = '', children }: CardProps) => (
    <div
        className={classNames('p-6 bg-white rounded pzh-box-shadow', className)}
        data-testid="card">
        {children}
    </div>
)
