'use client'

import { Separator as SeparatorPrimitive } from 'react-aria-components'

import { cn } from '../utils'

export type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive>

function Separator({
    className,
    orientation = 'horizontal',
    ...props
}: SeparatorProps) {
    return (
        <SeparatorPrimitive
            data-slot="separator"
            data-orientation={orientation}
            orientation={orientation}
            className={cn(
                'block shrink-0 border-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch',
                className
            )}
            {...props}
        />
    )
}

export { Separator }
