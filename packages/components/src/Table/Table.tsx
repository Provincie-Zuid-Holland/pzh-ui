import { ArrowDownAZ, ArrowDownZA } from '@pzh-ui/icons'
import classNames from 'classnames'
import {
    useReactTable,
    TableOptions,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'

export interface TableProps
    extends TableOptions<object | { onClick?: () => void }> {
    className?: string
}

export const Table = ({ className = '', ...rest }: TableProps) => {
    const tableInstance = useReactTable({
        ...rest,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    const headerGroups = tableInstance.getHeaderGroups()

    return (
        <table
            className={classNames('text-pzh-blue-dark w-full', className)}
            data-testid="table">
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr
                        key={headerGroup.id}
                        className="border-pzh-blue-dark border-opacity-35 border-b">
                        {headerGroup.headers.map(header => (
                            <th
                                key={header.id}
                                className="text-left font-bold"
                                {...(header.column.getCanSort() && {
                                    'aria-sort': header.column.getIsSorted()
                                        ? header.column.getSortIndex()
                                            ? 'descending'
                                            : 'ascending'
                                        : 'none',
                                })}>
                                {header.column.getCanSort() ? (
                                    <button
                                        {...{
                                            className: 'group w-full px-2 py-2',
                                            onClick:
                                                header.column.getToggleSortingHandler(),
                                        }}>
                                        <span className="flex items-center">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}

                                            {{
                                                asc: (
                                                    <ArrowDownAZ
                                                        size={18}
                                                        className={classNames(
                                                            'ml-2 group-hover:opacity-100',
                                                            {
                                                                'opacity-100':
                                                                    header.column.getIsSorted(),
                                                                'opacity-0':
                                                                    !header.column.getIsSorted(),
                                                            }
                                                        )}
                                                    />
                                                ),
                                                desc: (
                                                    <ArrowDownZA
                                                        size={18}
                                                        className={classNames(
                                                            'ml-2 group-hover:opacity-100',
                                                            {
                                                                'opacity-100':
                                                                    header.column.getIsSorted(),
                                                                'opacity-0':
                                                                    !header.column.getIsSorted(),
                                                            }
                                                        )}
                                                    />
                                                ),
                                            }[
                                                header.column.getIsSorted() as string
                                            ] ?? (
                                                <ArrowDownAZ
                                                    size={18}
                                                    className={classNames(
                                                        'ml-2 group-hover:opacity-100',
                                                        {
                                                            'opacity-100':
                                                                header.column.getIsSorted(),
                                                            'opacity-0':
                                                                !header.column.getIsSorted(),
                                                        }
                                                    )}
                                                />
                                            )}
                                        </span>
                                    </button>
                                ) : (
                                    <span className="px-2 py-2">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </span>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {tableInstance.getRowModel().rows.map(row => {
                    const hasOnClick =
                        'onClick' in row.original && !!row.original.onClick

                    return (
                        <tr
                            key={row.id}
                            onClick={
                                ('onClick' in row.original &&
                                    row.original.onClick) ||
                                undefined
                            }
                            onKeyDown={e =>
                                (e.key === 'Enter' &&
                                    'onClick' in row.original &&
                                    row.original.onClick?.()) ||
                                undefined
                            }
                            className={classNames(
                                'border-pzh-blue-dark border-opacity-35 border-b',
                                {
                                    'hover:bg-pzh-gray-100 focus:bg-pzh-gray-100 cursor-pointer':
                                        hasOnClick,
                                }
                            )}
                            tabIndex={hasOnClick ? 0 : undefined}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="h-8 px-2">
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
