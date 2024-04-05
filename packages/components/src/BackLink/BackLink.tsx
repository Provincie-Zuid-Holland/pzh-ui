import { AngleLeft } from '@pzh-ui/icons'
import { Slot, Slottable } from '@radix-ui/react-slot'
import classNames from 'clsx'

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
            className={classNames(
                'text-pzh-blue-dark flex items-center',
                className
            )}
            data-testid="back-link"
            {...rest}>
            <AngleLeft className="-mt-[2px] mr-2" />
            <Slottable>{children}</Slottable>
        </Component>
    )
}
