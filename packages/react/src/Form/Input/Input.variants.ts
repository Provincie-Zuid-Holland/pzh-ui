import { cva } from 'class-variance-authority'

export const inputControlVariants = cva(
    [
        'block',
        'w-full min-w-0',

        'rounded border',

        'border-input-border',
        'bg-input',
        'text-foreground',

        'transition-[background-color,color,border-color,box-shadow] duration-150',

        'outline-none',

        'hover:bg-input-hover',

        'aria-invalid:border-destructive',
        'aria-invalid:rounded-b-none',
    ],
    {
        variants: {
            size: {
                l: 'h-12 text-m',
                m: 'h-10 text-s',
            },
        },
        defaultVariants: {
            size: 'l',
        },
    }
)

export const inputPaddingVariants = cva('', {
    variants: {
        size: {
            l: 'px-4 py-2',
            m: 'px-2 py-2',
        },
    },
    defaultVariants: {
        size: 'l',
    },
})
