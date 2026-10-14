import type * as React from 'react'

import { cn } from '../utils'

export type TableProps = React.ComponentProps<'table'> & {
    containerClassName?: string
}
function Table({ className, containerClassName, ...props }: TableProps) {
    return (
        <div
            data-slot="table-container"
            className={cn(
                'relative w-full overflow-x-auto',
                containerClassName
            )}>
            <table
                data-slot="table"
                className={cn(
                    'text-s w-full caption-bottom text-foreground',
                    className
                )}
                {...props}
            />
        </div>
    )
}

export type TableHeaderProps = React.ComponentProps<'thead'>
function TableHeader({ className, ...props }: TableHeaderProps) {
    return (
        <thead
            data-slot="table-header"
            className={cn('[&_tr]:border-b', className)}
            {...props}
        />
    )
}

export type TableBodyProps = React.ComponentProps<'tbody'>
function TableBody({ className, ...props }: TableBodyProps) {
    return (
        <tbody
            data-slot="table-body"
            className={cn('', className)}
            {...props}
        />
    )
}

export type TableFooterProps = React.ComponentProps<'tfoot'>
function TableFooter({ className, ...props }: TableFooterProps) {
    return (
        <tfoot
            data-slot="table-footer"
            className={cn('font-bold border-t bg-surface-muted', className)}
            {...props}
        />
    )
}

export type TableRowProps = React.ComponentProps<'tr'>
function TableRow({ className, ...props }: TableRowProps) {
    return (
        <tr
            data-slot="table-row"
            className={cn(
                'border-b border-border data-[state=selected]:bg-surface-muted',
                className
            )}
            {...props}
        />
    )
}

export type TableHeadProps = React.ComponentProps<'th'>
function TableHead({ className, ...props }: TableHeadProps) {
    return (
        <th
            data-slot="table-head"
            className={cn(
                'h-10 px-2 font-bold first:pl-0 last:pr-0 text-left align-middle',
                className
            )}
            {...props}
        />
    )
}

export type TableCellProps = React.ComponentProps<'td'>
function TableCell({ className, ...props }: TableCellProps) {
    return (
        <td
            data-slot="table-cell"
            className={cn('px-2 py-2 text-left align-middle', className)}
            {...props}
        />
    )
}

export type TableCaptionProps = React.ComponentProps<'caption'>
function TableCaption({ className, ...props }: TableCaptionProps) {
    return (
        <caption
            data-slot="table-caption"
            className={cn('mt-4 text-s text-text-muted', className)}
            {...props}
        />
    )
}

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableRow,
    TableHead,
    TableCell,
    TableCaption,
}
