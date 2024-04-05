import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
    // use the `extend` key in case you want to extend instead of override
    override: {
        classGroups: {
            'font-size': ['text-s', 'text-m', 'text-l'],
        },
    },
})

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
