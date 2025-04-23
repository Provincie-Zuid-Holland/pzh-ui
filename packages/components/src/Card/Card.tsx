import { ReactNode } from 'react'
import { cn } from '../utils'

export interface CardProps {
    className?: string
    children: ReactNode
}

export const Card = ({ className = '', children }: CardProps) => (
    <div
        className={cn('shadow-card bg-pzh-white rounded p-6', className)}
        data-testid="card">
        {children}
    </div>
)
