import { ArrowDownArrowUp, ArrowUpArrowDown, Spinner } from '@pzh-ui/icons'
import {
    TableOptions,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import classNames from 'clsx'
import { ReactNode } from 'react'

import { Pagination } from '../Pagination'
import { cn } from '../utils'

export interface TableProps
    extends Omit<
        TableOptions<unknown>,
        'getCoreRowModel' | 'getSortedRowModel' | 'manualPagination'
    > {
    caption?: string
    className?: string
    current?: number
    limit?: number
    total?: number
    isLoading?: boolean
}

const SortIcon = ({
    sorted,
}: {
    sorted: false | 'asc' | 'desc' | undefined
}) => {
    const Icon = sorted === 'desc' ? ArrowDownArrowUp : ArrowUpArrowDown

    return (
        <Icon
            size={21}
            className={classNames('text-pzh-green-500 -mt-1 ml-2', {
                'opacity-100': !!sorted,
                'opacity-40': !sorted,
            })}
        />
    )
}

const TableHeader = ({
    table,
}: {
    table: ReturnType<typeof useReactTable>
}) => (
    <thead className="text-pzh-blue-500">
        {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                    const canSort = header.column.getCanSort()
                    const sorted = header.column.getIsSorted()

                    return (
                        <th
                            key={header.id}
                            colSpan={header.colSpan}
                            className="text-left font-bold"
                            aria-sort={
                                canSort
                                    ? sorted === 'desc'
                                        ? 'descending'
                                        : sorted === 'asc'
                                          ? 'ascending'
                                          : 'none'
                                    : undefined
                            }>
                            {header.isPlaceholder ? null : (
                                <div
                                    className={classNames(
                                        'group border-pzh-gray-300 flex w-full items-center border-b px-2 pb-2',
                                        {
                                            'cursor-pointer select-none':
                                                canSort,
                                        }
                                    )}
                                    tabIndex={canSort ? 0 : -1}
                                    onClick={header.column.getToggleSortingHandler()}
                                    onKeyDown={e => {
                                        if (
                                            e.key === 'Enter' ||
                                            e.key === ' '
                                        ) {
                                            header.column.toggleSorting()
                                        }
                                    }}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {canSort && <SortIcon sorted={sorted} />}
                                </div>
                            )}
                        </th>
                    )
                })}
            </tr>
        ))}
    </thead>
)

const TableBody = ({
    table,
    isLoading,
    className,
}: {
    table: ReturnType<typeof useReactTable>
    isLoading?: boolean
    className?: string
}) => (
    <tbody className="text-pzh-blue-500 relative">
        {table.getRowModel().rows.map(row => {
            const original = row.original as any
            const hasOnClick = typeof original?.onClick === 'function'

            return (
                <tr
                    key={row.id}
                    onClick={e => {
                        const target = e.target as HTMLElement

                        // If the target or any of its parents is interactive, don't trigger row click
                        if (
                            target.closest(
                                'button, a, svg, [role="button"], [role="menuitem"]'
                            )
                        ) {
                            return
                        }

                        original?.onClick?.()
                    }}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            original?.onClick?.()
                        }
                    }}
                    tabIndex={hasOnClick ? 0 : undefined}
                    className={classNames('border-pzh-gray-300 border-b', {
                        'hover:bg-pzh-gray-100 focus:bg-pzh-gray-100 cursor-pointer':
                            hasOnClick,
                    })}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="px-2 py-4">
                            {cell.renderValue() as ReactNode}
                        </td>
                    ))}
                </tr>
            )
        })}

        {isLoading && (
            <div className="bg-pzh-gray-800/10 absolute top-0 left-0 flex h-full w-full animate-pulse items-center justify-center">
                <Spinner
                    className={`inline-block animate-spin ${className}`}
                    data-testid="loader-spinner"
                />
            </div>
        )}
    </tbody>
)

export const Table = ({
    caption,
    className = '',
    limit = 20,
    total,
    current,
    isLoading,
    ...rest
}: TableProps) => {
    const table = useReactTable({
        ...rest,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
    })

    return (
        <div className="flex flex-col items-center">
            <table className={cn('mb-8 w-full', className)} data-testid="table">
                {caption && <caption className="sr-only">{caption}</caption>}
                <TableHeader table={table} />
                <TableBody
                    table={table}
                    isLoading={isLoading}
                    className={className}
                />
            </table>

            {!!current && !!total && !!limit && total > limit && (
                <Pagination
                    onPageChange={table.setPageIndex}
                    total={total}
                    limit={limit}
                    current={current}
                />
            )}
        </div>
    )
}
