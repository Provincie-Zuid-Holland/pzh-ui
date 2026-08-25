'use client'

import {
    LabelContext,
    Label as LabelPrimitive,
    type LabelProps as LabelPrimitiveProps,
} from 'react-aria-components'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../utils'

export type LabelProps = LabelPrimitiveProps &
    VariantProps<typeof labelVariants>

const labelVariants = cva(
    'gap-2 font-bold flex items-center leading-none text-primary select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed',
    {
        variants: {
            size: {
                l: 'text-m',
                m: 'text-s',
            },
        },
        defaultVariants: {
            size: 'l',
        },
    }
)

function Label({ className, htmlFor, slot, size, ...props }: LabelProps) {
    const label = (
        <LabelPrimitive
            data-slot="label"
            className={cn(labelVariants({ size }), className)}
            {...props}
            htmlFor={htmlFor}
            slot={slot}
        />
    )

    if (htmlFor && slot === undefined) {
        return (
            <LabelContext.Provider value={null}>{label}</LabelContext.Provider>
        )
    }

    return label
}

export { Label }
