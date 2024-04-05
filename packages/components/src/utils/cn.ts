import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
    // use the `extend` key in case you want to extend instead of override
    override: {
        classGroups: {
            'font-size': [
                'text-s',
                'text-m',
                'text-l',
                'text-heading-xs',
                'text-heading-s',
                'text-heading-m',
                'text-heading-l',
                'text-heading-xl',
                'text-heading-xxl',
                'text-heading-xxxl',
            ],
        },
    },
})

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
