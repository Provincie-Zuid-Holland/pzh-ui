import { ArrowDownAZ, ArrowDownZA, Spinner } from '@pzh-ui/icons'
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
            <table
                className={cn('text-pzh-blue-dark mb-8 w-full', className)}
                data-testid="table">
                {caption && <caption className="sr-only">{caption}</caption>}
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr
                            key={headerGroup.id}
                            className="border-pzh-blue-dark/35 border-b">
                            {headerGroup.headers.map(header => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
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
                                                    'flex items-center group w-full px-4 py-2',
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
                                                        <ArrowDownAZ
                                                            size={18}
                                                            className={classNames(
                                                                'text-pzh-green ml-2',
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
                                                        <ArrowDownZA
                                                            size={18}
                                                            className={classNames(
                                                                'text-pzh-green ml-2',
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
                                                        <ArrowDownAZ
                                                            size={18}
                                                            className={classNames(
                                                                'text-pzh-green ml-2',
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
                <tbody className="relative">
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
                                    'border-pzh-blue-dark/35 border-b',
                                    {
                                        'hover:bg-pzh-gray-100 focus:bg-pzh-gray-100 cursor-pointer':
                                            hasOnClick,
                                    }
                                )}
                                tabIndex={hasOnClick ? 0 : undefined}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="h-10 px-4">
                                        {cell.renderValue() as ReactNode}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                    {isLoading && (
                        <div className="bg-pzh-gray-800/10 absolute left-0 top-0 flex h-full w-full animate-pulse items-center justify-center">
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
