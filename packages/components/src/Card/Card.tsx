import classNames from 'classnames'
import { ReactNode } from 'react'

export interface CardProps {
    className?: string
    children: ReactNode
}

export const Card = ({ className = '', children }: CardProps) => (
    <div
        className={classNames('p-6 bg-white rounded', className)}
        style={{
            boxShadow: "0px 18px 60px rgba(0, 0, 0, 0.07), 0px 4.02054px 13.4018px rgba(0, 0, 0, 0.0417275), 0px 1.19702px 3.99006px rgba(0, 0, 0, 0.0282725)"
        }}
        data-testid="card">
        {children}
    </div>
)
