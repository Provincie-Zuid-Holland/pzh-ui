import { Slot, Slottable } from '@radix-ui/react-slot'
import { cn } from '../utils'

export interface HyperlinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    icon?: any
    asChild?: boolean
}

export const Hyperlink = ({
    icon: Icon,
    asChild,
    children,
    ...rest
}: HyperlinkProps) => {
    const Component = asChild ? Slot : 'a'

    return (
        <Component
            className={cn(
                'text-pzh-green-500 hover:text-pzh-blue-900 inline-flex items-center underline',
                rest.className
            )}
            {...rest}>
            <Slottable>{children}</Slottable>
            {Icon ? <Icon className="mt-[1px] ml-2" /> : null}
        </Component>
    )
}
