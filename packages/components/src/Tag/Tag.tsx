import classNames from 'classnames'

import { Xmark } from '@pzh-ui/icons'

export interface TagProps {
    text: string
    onClick?: (() => void) | null
    className?: string
}

export const Tag = ({ text, onClick, className = '' }: TagProps) => {
    const Component = !!onClick ? 'button' : 'div'

    return (
        <Component
            className={classNames(
                'border-pzh-blue-dark inline-flex items-center rounded border px-3',
                {
                    'hover:bg-pzh-blue-dark focus:bg-pzh-blue transition duration-150 hover:text-white focus:text-white':
                        !!onClick,
                },
                className
            )}
            {...(onClick && {
                onClick,
                type: 'button',
            })}
            style={{ paddingTop: 2 }}
            data-testid="tag">
            <span>{text}</span>
            {!!onClick && <Xmark className="-mt-[2px] ml-2" />}
        </Component>
    )
}
