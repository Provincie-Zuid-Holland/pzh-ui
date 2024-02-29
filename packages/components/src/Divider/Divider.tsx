import classNames from 'clsx'

export interface DividerProps {
    className?: string
}

export const Divider = ({ className = 'my-2' }: DividerProps) => (
    <div
        data-testid="divider"
        className={classNames('bg-pzh-gray-300 h-px w-full', className)}
    />
)
