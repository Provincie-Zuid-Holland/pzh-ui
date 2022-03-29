import classNames from 'classnames'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
                'inline-block border border-pzh-blue-dark rounded-lg px-3',
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
            {!!onClick && (
                <FontAwesomeIcon icon={faTimes} className="ml-3 text-xs" />
            )}
        </Component>
    )
}
