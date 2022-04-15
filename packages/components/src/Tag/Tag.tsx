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
                'inline-flex items-center border border-pzh-blue-dark rounded-lg px-3',
                {
                    'transition duration-150 hover:bg-pzh-blue-dark hover:text-white focus:bg-pzh-blue focus:text-white':
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
            {!!onClick && <Xmark className="ml-2 -mt-[2px]" />}
        </Component>
    )
}
