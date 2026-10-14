import * as React from 'react'

import { AngleLeft, AngleRight, Ellipsis } from '@pzh-ui/icons'

import { Button, LinkButton } from '../Button'
import { cn } from '../utils'

export type PaginationProps = React.ComponentProps<'nav'>

function Pagination({ className, ...props }: PaginationProps) {
    return (
        <nav
            role="navigation"
            aria-label="pagination"
            data-slot="pagination"
            className={cn('flex w-full justify-center', className)}
            {...props}
        />
    )
}

export type PaginationContentProps = React.ComponentProps<'ul'>

function PaginationContent({ className, ...props }: PaginationContentProps) {
    return (
        <ul
            data-slot="pagination-content"
            className={cn('gap-2 flex items-center', className)}
            {...props}
        />
    )
}

export type PaginationItemProps = React.ComponentProps<'li'>

function PaginationItem({ ...props }: PaginationItemProps) {
    return <li data-slot="pagination-item" {...props} />
}

export type PaginationLinkProps = {
    isActive?: boolean
} & (
    | ({ asButton: true } & Omit<
          React.ComponentProps<typeof Button>,
          'variant'
      >)
    | ({ asButton?: false } & Omit<
          React.ComponentProps<typeof LinkButton>,
          'variant'
      >)
)

function PaginationLink(props: PaginationLinkProps) {
    const { className, isActive, size = 'm' } = props
    const classNames = cn(
        'size-10 p-0 text-m border-transparent bg-transparent text-primary',
        'hover:border-success hover:bg-background hover:text-success',
        'focus-visible:border-transparent focus-visible:bg-background focus-visible:text-primary focus-visible:ring-2',
        'active:border-primary-active active:bg-primary-active active:text-primary-foreground',
        'data-disabled:pointer-events-none data-disabled:border-transparent data-disabled:bg-transparent data-disabled:text-text-disabled',
        isActive &&
            'border-primary bg-background text-primary hover:bg-background',
        className
    )
    if (props.asButton) {
        const { asButton, isActive: active, ...buttonProps } = props
        void asButton
        return (
            <Button
                {...buttonProps}
                type={buttonProps.type ?? 'button'}
                variant="default"
                size={size}
                className={classNames}
                aria-current={active ? 'page' : undefined}
                data-slot="pagination-link"
                data-active={active}
            />
        )
    }
    const { asButton, isActive: active, ...linkProps } = props
    void asButton
    return (
        <LinkButton
            {...linkProps}
            variant="default"
            size={size}
            className={classNames}
            aria-current={active ? 'page' : undefined}
            data-slot="pagination-link"
            data-active={active}
        />
    )
}

export type PaginationPreviousProps = React.ComponentProps<
    typeof PaginationLink
>

function PaginationPrevious({ className, ...props }: PaginationPreviousProps) {
    return (
        <PaginationLink
            aria-label="Ga naar de vorige pagina"
            className={cn('[&_svg]:size-5', className)}
            {...props}>
            <AngleLeft data-icon="inline-start" className="cn-rtl-flip" />
        </PaginationLink>
    )
}

export type PaginationNextProps = React.ComponentProps<typeof PaginationLink>

function PaginationNext({ className, ...props }: PaginationNextProps) {
    return (
        <PaginationLink
            aria-label="Ga naar de volgende pagina"
            className={cn('[&_svg]:size-5', className)}
            {...props}>
            <AngleRight data-icon="inline-end" className="cn-rtl-flip" />
        </PaginationLink>
    )
}

function PaginationEllipsis({
    className,
    ...props
}: React.ComponentProps<'span'>) {
    return (
        <span
            aria-hidden
            data-slot="pagination-ellipsis"
            className={cn(
                "size-12 [&_svg:not([class*='size-'])]:size-5 flex items-center justify-center text-primary",
                className
            )}
            {...props}>
            <Ellipsis />
            <span className="sr-only">Meer pagina's</span>
        </span>
    )
}

export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
}
