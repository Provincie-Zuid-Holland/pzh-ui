import { Xmark } from '@pzh-ui/icons'
import { cn } from '../utils'

export interface TagProps {
    text: string
    onClick?: (() => void) | null
    className?: string
}

export const Tag = ({ text, onClick, className = '' }: TagProps) => {
    const Component = !!onClick ? 'button' : 'div'

    return (
        <Component
            className={cn(
                'border-pzh-blue-500 focus:ring-pzh-focus inline-flex h-8 items-center rounded border px-2 ring-offset-2 focus:outline-none focus:ring-2',
                {
                    'hover:bg-pzh-blue-500 hover:text-pzh-white transition duration-150':
                        !!onClick,
                },
                className
            )}
            {...(onClick && {
                onClick,
                type: 'button',
            })}
            data-testid="tag">
            <span>{text}</span>
            {!!onClick && <Xmark className="ml-2" />}
        </Component>
    )
}
