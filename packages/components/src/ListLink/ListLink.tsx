import { AngleRight } from '@pzh-ui/icons'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { cn } from '../utils'

export interface ListLinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    className?: string
    asChild?: boolean
}

export const ListLink = ({
    children,
    asChild,
    className,
    ...rest
}: ListLinkProps) => {
    const Component = asChild ? Slot : 'a'

    return (
        <Component
            className={cn(
                'text-pzh-blue-500 hover:text-pzh-green-500 inline-flex items-center font-bold',
                className
            )}
            {...rest}>
            <AngleRight className="relative mr-1 min-w-[14px]" size={18} />
            <Slottable>{children}</Slottable>
        </Component>
    )
}
