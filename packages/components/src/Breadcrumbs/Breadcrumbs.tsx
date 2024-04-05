import { AngleRight } from '@pzh-ui/icons'

import { Slot } from '@radix-ui/react-slot'
import { ReactNode } from 'react'

export interface BreadcrumbsProps {
    className?: string
    children: ReactNode
}

export const Breadcrumbs = ({ children, className }: BreadcrumbsProps) => (
    <nav
        aria-label="Broodkruimelpad"
        className={`text-pzh-blue-dark text-s w-full ${className}`}>
        <ol className="hidden md:flex">{children}</ol>
    </nav>
)

export interface BreadcrumbItemProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children?: ReactNode
    asChild?: boolean
    isCurrent?: boolean
}

export const BreadcrumbItem = ({
    children,
    asChild = false,
    isCurrent = false,
    ...rest
}: BreadcrumbItemProps) => {
    const Component = asChild ? Slot : 'a'

    if (isCurrent) {
        return (
            <li className="inline-block truncate">
                <span aria-current="page">{children}</span>
            </li>
        )
    }

    return (
        <li className="mr-2 flex items-center whitespace-nowrap underline underline-offset-2">
            <Component {...rest}>{children}</Component>
            <AngleRight className="sr-hidden -mt-0.5 ml-2" aria-hidden />
        </li>
    )
}
