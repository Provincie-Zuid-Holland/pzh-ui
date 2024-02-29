import classNames from 'clsx'
import { ReactNode } from 'react'

export interface CardProps {
    className?: string
    children: ReactNode
}

export const Card = ({ className = '', children }: CardProps) => (
    <div
        className={classNames('shadow-card rounded bg-white p-6', className)}
        data-testid="card">
        {children}
    </div>
)
