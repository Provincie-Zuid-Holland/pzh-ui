import { ArrowDownAZ, ArrowDownZA } from '@pzh-ui/icons'
import classNames from 'classnames'
import { useTable, useSortBy, TableOptions } from 'react-table'

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
            className={classNames('w-full text-pzh-blue-dark', className)}
            data-testid="table"
            {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr
                        {...headerGroup.getHeaderGroupProps()}
                        className="border-b border-pzh-blue-dark border-opacity-35">
                        {headerGroup.headers.map(column => (
                            // Add the sorting props to control sorting. For this example
                            // we can add them into the header props
                            <th
                                {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                )}
                                className="py-2 px-2 text-left font-bold group">
                                <span className="flex items-center">
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    {column.canSort &&
                                        (column.isSortedDesc ? (
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
                                        ))}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)

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
                            className="border-b border-pzh-blue-dark border-opacity-35 cursor-pointer hover:bg-pzh-gray-100 focus:bg-pzh-gray-100"
                            tabIndex={0}>
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        className="px-2 h-8">
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
