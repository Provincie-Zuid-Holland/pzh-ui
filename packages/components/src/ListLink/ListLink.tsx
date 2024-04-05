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
                'inline-flex items-start underline decoration-1 ',
                {
                    'text-pzh-blue-dark hover:text-pzh-green': !className,
                },
                className
            )}
            {...rest}>
            <AngleRight className="relative -bottom-[6px] mr-2 min-w-[14px]" />
            <Slottable>{children}</Slottable>
        </Component>
    )
}
