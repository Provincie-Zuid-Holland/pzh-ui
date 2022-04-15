import classNames from 'classnames'
import { useTable, useSortBy, TableOptions } from 'react-table'

export interface TableProps extends TableOptions<object> {
    className?: string
}

export const Table = ({ columns, data, className = '' }: TableProps) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(
            {
                columns,
                data,
            },
            useSortBy
        )

    return (
        <table
            className={classNames('w-full text-pzh-blue-dark', className)}
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
                                className="py-2 text-left font-bold">
                                {column.render('Header')}
                                {/* Add a sort direction indicator */}
                                <span>
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? ' 🔽'
                                            : ' 🔼'
                                        : ''}
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
                            className="border-b border-pzh-blue-dark border-opacity-35">
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        className="h-8">
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
