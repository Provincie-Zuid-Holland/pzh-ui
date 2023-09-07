import classNames from 'classnames'
import { TableOptions, useSortBy, useTable } from 'react-table'

import { ArrowDownAZ, ArrowDownZA } from '@pzh-ui/icons'

export interface TableProps
    extends TableOptions<object | { onClick?: () => void }> {
    className?: string
}

export const Table = ({ className = '', ...rest }: TableProps) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(
            {
                ...rest,
            },
            useSortBy
        )

    return (
        <table
            className={classNames('text-pzh-blue-dark w-full', className)}
            data-testid="table"
            {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr
                        {...headerGroup.getHeaderGroupProps()}
                        className="border-pzh-blue-dark/35 border-b">
                        {headerGroup.headers.map(column => (
                            // Add the sorting props to control sorting. For this example
                            // we can add them into the header props
                            <th
                                {...column.getHeaderProps()}
                                className="text-left font-bold"
                                {...(column.canSort && {
                                    'aria-sort': column.isSorted
                                        ? column.isSortedDesc
                                            ? 'descending'
                                            : 'ascending'
                                        : 'none',
                                })}>
                                {column.canSort ? (
                                    <button
                                        {...column.getSortByToggleProps()}
                                        className="group w-full px-4 py-2">
                                        <span className="flex items-center">
                                            {column.render('Header')}

                                            {/* Add a sort direction indicator */}
                                            {column.isSortedDesc ? (
                                                <ArrowDownZA
                                                    size={18}
                                                    className={classNames(
                                                        'ml-2 group-hover:opacity-100',
                                                        {
                                                            'opacity-100':
                                                                column.isSorted,
                                                            'opacity-0':
                                                                !column.isSorted,
                                                        }
                                                    )}
                                                />
                                            ) : (
                                                <ArrowDownAZ
                                                    size={18}
                                                    className={classNames(
                                                        'ml-2 group-hover:opacity-100',
                                                        {
                                                            'opacity-100':
                                                                column.isSorted,
                                                            'opacity-0':
                                                                !column.isSorted,
                                                        }
                                                    )}
                                                />
                                            )}
                                        </span>
                                    </button>
                                ) : (
                                    <span className="p-4">
                                        {column.render('Header')}
                                    </span>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)

                    const hasOnClick =
                        'onClick' in row.original && !!row.original.onClick

                    return (
                        <tr
                            {...row.getRowProps()}
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
                                'border-pzh-blue-dark/35 border-b',
                                {
                                    'hover:bg-pzh-gray-100 focus:bg-pzh-gray-100 cursor-pointer':
                                        hasOnClick,
                                }
                            )}
                            tabIndex={hasOnClick ? 0 : undefined}>
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        className="h-10 px-4">
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
