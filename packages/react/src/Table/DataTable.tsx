'use client'

import { AngleLeft, AngleRight, Sort, SortAsc, SortDesc } from '@pzh-ui/icons'

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type TableOptions,
} from '@tanstack/react-table'

import { Button } from '../Button'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
} from '../Pagination'
import { cn } from '../utils'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './Table'

export type DataTableProps<TData> = Omit<
    TableOptions<TData>,
    'getCoreRowModel'
> & {
    caption: string
    className?: string
    emptyMessage?: string
    isLoading?: boolean
    loadingMessage?: string
    pagination?: boolean
}

function DataTable<TData>({
    caption,
    className,
    emptyMessage = 'Geen resultaten gevonden.',
    isLoading = false,
    loadingMessage = 'Gegevens laden…',
    pagination = true,
    ...options
}: DataTableProps<TData>) {
    const table = useReactTable({
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
        ...options,
        getCoreRowModel: getCoreRowModel(),
    })
    const pageIndex = table.getState().pagination.pageIndex
    const pageCount = table.getPageCount()
    // Show the endpoints and a bounded window around the current page.
    const windowStart = Math.max(0, Math.min(pageIndex - 2, pageCount - 5))
    const visiblePages = [
        ...new Set([
            0,
            ...Array.from(
                { length: Math.min(5, pageCount) },
                (_, index) => windowStart + index
            ),
            pageCount - 1,
        ]),
    ]
        .filter(page => page >= 0 && page < pageCount)
        .sort((a, b) => a - b)
    const pages: (number | string)[] = []
    visiblePages.forEach((page, index) => {
        const previous = visiblePages[index - 1]
        if (previous !== undefined && page - previous === 2) {
            pages.push(previous + 1)
        } else if (previous !== undefined && page - previous > 2) {
            pages.push(`ellipsis-${previous}`)
        }
        pages.push(page)
    })
    return (
        <div className={cn('space-y-6', className)}>
            <Table aria-busy={isLoading}>
                <TableCaption className="sr-only">{caption}</TableCaption>
                <TableHeader>
                    {table.getHeaderGroups().map(group => (
                        <TableRow key={group.id}>
                            {group.headers.map(header => {
                                const sorted = header.column.getIsSorted()
                                const SortIcon =
                                    sorted === 'asc'
                                        ? SortAsc
                                        : sorted === 'desc'
                                          ? SortDesc
                                          : Sort
                                const sortable =
                                    !header.isPlaceholder &&
                                    header.column.getCanSort()
                                return (
                                    <TableHead
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        scope="col"
                                        aria-sort={
                                            sortable
                                                ? sorted === 'asc'
                                                    ? 'ascending'
                                                    : sorted === 'desc'
                                                      ? 'descending'
                                                      : 'none'
                                                : undefined
                                        }>
                                        {header.isPlaceholder ? null : sortable ? (
                                            <button
                                                type="button"
                                                className="gap-1 rounded inline-flex cursor-pointer items-center outline-none hover:text-success focus-visible:ring-2 focus-visible:ring-focus"
                                                onClick={header.column.getToggleSortingHandler()}>
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                <SortIcon
                                                    aria-hidden="true"
                                                    className="size-3 text-primary"
                                                />
                                            </button>
                                        ) : (
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )
                                        )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell
                                colSpan={Math.max(
                                    1,
                                    table.getVisibleLeafColumns().length
                                )}
                                className="h-24 text-center">
                                <span role="status">{loadingMessage}</span>
                            </TableCell>
                        </TableRow>
                    ) : table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map(row => (
                            <TableRow
                                key={row.id}
                                data-state={
                                    row.getIsSelected() ? 'selected' : undefined
                                }>
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={Math.max(
                                    1,
                                    table.getVisibleLeafColumns().length
                                )}
                                className="h-24 text-center">
                                <span role="status">{emptyMessage}</span>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {pagination && pageCount > 1 && (
                <Pagination aria-label="Tabelpagina’s">
                    <PaginationContent>
                        <PaginationItem>
                            <Button
                                variant="default"
                                className="size-10 p-0 border-transparent bg-transparent text-primary hover:text-success"
                                aria-label="Ga naar de vorige pagina"
                                isDisabled={
                                    isLoading || !table.getCanPreviousPage()
                                }
                                onPress={() => table.previousPage()}>
                                <AngleLeft aria-hidden="true" />
                            </Button>
                        </PaginationItem>
                        {pages.map(page =>
                            typeof page === 'string' ? (
                                <PaginationItem key={page}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            ) : (
                                <PaginationItem key={page}>
                                    <Button
                                        variant="default"
                                        className={cn(
                                            'size-10 p-0 bg-transparent text-primary hover:bg-background hover:text-success',
                                            page === pageIndex
                                                ? 'border-primary bg-background'
                                                : 'border-transparent'
                                        )}
                                        aria-label={`Pagina ${page + 1}`}
                                        aria-current={
                                            page === pageIndex
                                                ? 'page'
                                                : undefined
                                        }
                                        isDisabled={isLoading}
                                        onPress={() =>
                                            table.setPageIndex(page)
                                        }>
                                        {page + 1}
                                    </Button>
                                </PaginationItem>
                            )
                        )}
                        <PaginationItem>
                            <Button
                                variant="default"
                                className="size-10 p-0 border-transparent bg-transparent text-primary hover:text-success"
                                aria-label="Ga naar de volgende pagina"
                                isDisabled={
                                    isLoading || !table.getCanNextPage()
                                }
                                onPress={() => table.nextPage()}>
                                <AngleRight aria-hidden="true" />
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}
export { DataTable }
