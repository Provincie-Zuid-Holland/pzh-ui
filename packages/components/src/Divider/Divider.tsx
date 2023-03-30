import classNames from 'classnames'

export interface DividerProps {
    className?: string
}

export const Divider = ({ className = 'my-2' }: DividerProps) => (
    <div
        data-testid="divider"
        className={classNames('w-full h-px bg-pzh-gray-300', className)}
    />
)
