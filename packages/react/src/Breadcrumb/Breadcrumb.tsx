'use client'

import * as React from 'react'
import {
    Breadcrumb as BreadcrumbPrimitive,
    Breadcrumbs as BreadcrumbsPrimitive,
    composeRenderProps,
    Link as LinkPrimitive,
    type BreadcrumbProps as BreadcrumbPrimitiveProps,
    type BreadcrumbsProps as BreadcrumbsPrimitiveProps,
    type LinkProps,
} from 'react-aria-components'

import { ChevronRight, Ellipsis } from '@pzh-ui/icons'

import { cn } from '../utils'

export type BreadcrumbProps = React.ComponentProps<'nav'> & {
    size?: 's' | 'm'
}

function Breadcrumb({ className, size = 'm', ...props }: BreadcrumbProps) {
    return (
        <nav
            aria-label="breadcrumb"
            data-slot="breadcrumb"
            data-size={size}
            className={cn('group/breadcrumb w-full', className)}
            {...props}
        />
    )
}

export type BreadcrumbListProps<T extends object> = BreadcrumbsPrimitiveProps<T>

function BreadcrumbList<T extends object>({
    className,
    ...props
}: BreadcrumbListProps<T>) {
    return (
        <BreadcrumbsPrimitive
            data-slot="breadcrumb-list"
            className={cn(
                'gap-2 flex flex-wrap items-center wrap-break-word',
                'group-data-[size=s]/breadcrumb:text-s',
                'group-data-[size=m]/breadcrumb:text-m',
                className
            )}
            {...props}
        />
    )
}

export type BreadcrumbItemProps = BreadcrumbPrimitiveProps & {
    separatorClassName?: string
}

function BreadcrumbItem({
    className,
    children,
    separatorClassName,
    ...props
}: BreadcrumbItemProps) {
    return (
        <BreadcrumbPrimitive
            data-slot="breadcrumb-item"
            className={cn('gap-2 inline-flex items-center', className)}
            {...props}>
            {composeRenderProps(children, (children, { isCurrent }) => (
                <>
                    {children}
                    {!isCurrent && (
                        <span
                            data-slot="breadcrumb-separator"
                            role="presentation"
                            aria-hidden="true"
                            className={cn(
                                '[&>svg]:size-3.5 w-2.5 flex items-center text-foreground',
                                separatorClassName
                            )}>
                            <ChevronRight className="cn-rtl-flip" />
                        </span>
                    )}
                </>
            ))}
        </BreadcrumbPrimitive>
    )
}

export type BreadcrumbLinkProps = LinkProps

function BreadcrumbLink({ className, render, ...props }: BreadcrumbLinkProps) {
    return (
        <LinkPrimitive
            data-slot="breadcrumb-link"
            className={cn(
                'text-primary underline decoration-1 underline-offset-2 transition-colors hover:text-primary-hover',
                'focus-visible:ring-2 focus-visible:ring-focus focus-visible:outline-none',
                '[&>svg]:size-4 [&>svg]:shrink-0',
                className
            )}
            render={render}
            {...props}
        />
    )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
    return (
        <span
            data-slot="breadcrumb-page"
            role="link"
            aria-disabled="true"
            aria-current="page"
            className={cn('font-normal text-text-muted', className)}
            {...props}
        />
    )
}

function BreadcrumbEllipsis({
    className,
    ...props
}: React.ComponentProps<'span'>) {
    return (
        <span
            data-slot="breadcrumb-ellipsis"
            role="presentation"
            aria-hidden="true"
            className={cn(
                'size-5 [&>svg]:size-4 flex items-center justify-center text-foreground',
                className
            )}
            {...props}>
            <Ellipsis />
            <span className="sr-only">Meer pagina's</span>
        </span>
    )
}

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbEllipsis,
}
