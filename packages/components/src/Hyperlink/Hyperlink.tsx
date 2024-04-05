import { Slot, Slottable } from '@radix-ui/react-slot'

export interface HyperlinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    text: string
    icon?: any
    asChild?: boolean
}

export const Hyperlink = ({
    text,
    icon: Icon,
    asChild,
    ...rest
}: HyperlinkProps) => {
    const Component = asChild ? Slot : 'a'

    return (
        <Component
            className="text-pzh-green hover:text-pzh-blue-dark inline-flex items-center underline"
            {...rest}>
            <Slottable>{text}</Slottable>
            {Icon ? <Icon className="ml-2 mt-[1px]" /> : null}
        </Component>
    )
}
