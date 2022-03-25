import classNames from 'classnames'

export interface DividerProps {
    className?: string
}

export const Divider = ({ className = 'my-2' }: DividerProps) => (
    <div
        data-testid="divider"
        className={classNames(
            'w-full h-px bg-pzh-cool-gray-light bg-opacity-50',
            className
        )}
    />
)
