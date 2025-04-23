import { Slot, Slottable } from '@radix-ui/react-slot'

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
            className="text-pzh-green-500 hover:text-pzh-blue-900 inline-flex items-center underline"
            {...rest}>
            <Slottable>{children}</Slottable>
            {Icon ? <Icon className="ml-2 mt-[1px]" /> : null}
        </Component>
    )
}
