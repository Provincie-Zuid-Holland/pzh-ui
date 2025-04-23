import { AngleLeft } from '@pzh-ui/icons'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { cn } from '../utils'

export interface BackLinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    asChild?: boolean
    className?: string
}

export const BackLink = ({
    asChild,
    className,
    children = 'Terug',
    ...rest
}: BackLinkProps) => {
    const Component = asChild ? Slot : 'a'

    return (
        <Component
            className={cn('text-pzh-blue-900 flex items-center', className)}
            data-testid="back-link"
            {...rest}>
            <AngleLeft className="mr-2" />
            <Slottable>{children}</Slottable>
        </Component>
    )
}
