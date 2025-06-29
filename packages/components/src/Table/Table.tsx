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
                <thead className="text-pzh-blue-500">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    className="text-left font-bold"
                                    {...(header.column.getCanSort() && {
                                        'aria-sort':
                                            !!header.column.getIsSorted()
                                                ? header.column.getIsSorted() ===
                                                  'desc'
                                                    ? 'descending'
                                                    : 'ascending'
                                                : 'none',
                                    })}>
                                    {header.isPlaceholder ? null : (
                                        <div
                                            {...{
                                                className: classNames(
                                                    'flex items-center group w-full',
                                                    {
                                                        'cursor-pointer select-none':
                                                            header.column.getCanSort(),
                                                    }
                                                ),
                                                tabIndex:
                                                    header.column.getCanSort()
                                                        ? 0
                                                        : -1,
                                                onKeyPress: e =>
                                                    (e.key === 'Enter' ||
                                                        e.key === ' ') &&
                                                    header.column.toggleSorting(),
                                                onClick:
                                                    header.column.getToggleSortingHandler(),
                                            }}>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {header.column.getCanSort() &&
                                                ({
                                                    asc: (
                                                        <ArrowUpArrowDown
                                                            size={21}
                                                            className={classNames(
                                                                'text-pzh-green-500 -mt-1 ml-2',
                                                                {
                                                                    'opacity-100':
                                                                        !!header.column.getIsSorted(),
                                                                    'opacity-0 group-hover:opacity-40 group-focus:opacity-40':
                                                                        !!!header.column.getIsSorted(),
                                                                }
                                                            )}
                                                        />
                                                    ),
                                                    desc: (
                                                        <ArrowDownArrowUp
                                                            size={21}
                                                            className={classNames(
                                                                'text-pzh-green-500 -mt-1 ml-2',
                                                                {
                                                                    'opacity-100':
                                                                        !!header.column.getIsSorted(),
                                                                    'opacity-0 group-hover:opacity-40 group-focus:opacity-40':
                                                                        !!!header.column.getIsSorted(),
                                                                }
                                                            )}
                                                        />
                                                    ),
                                                    false: (
                                                        <ArrowUpArrowDown
                                                            size={21}
                                                            className={classNames(
                                                                'text-pzh-green-500 -mt-1 ml-2',
                                                                {
                                                                    'opacity-100':
                                                                        !!header.column.getIsSorted(),
                                                                    'opacity-0 group-hover:opacity-40 group-focus:opacity-40':
                                                                        !!!header.column.getIsSorted(),
                                                                }
                                                            )}
                                                        />
                                                    ),
                                                }[
                                                    header.column.getIsSorted() as string
                                                ] ??
                                                    null)}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="text-pzh-blue-500 relative">
                    {table.getRowModel().rows.map(row => {
                        const hasOnClick =
                            'onClick' in (row.original as any) &&
                            !!(row.original as any).onClick

                        return (
                            <tr
                                key={row.id}
                                onClick={
                                    ('onClick' in (row.original as any) &&
                                        (row.original as any).onClick) ||
                                    undefined
                                }
                                onKeyDown={e =>
                                    (e.key === 'Enter' &&
                                        'onClick' in (row.original as any) &&
                                        (row.original as any).onClick?.()) ||
                                    undefined
                                }
                                className={classNames(
                                    'border-pzh-gray-300 border-b',
                                    {
                                        'hover:bg-pzh-gray-100 focus:bg-pzh-gray-100 cursor-pointer':
                                            hasOnClick,
                                    }
                                )}
                                tabIndex={hasOnClick ? 0 : undefined}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="py-4 pr-4">
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
