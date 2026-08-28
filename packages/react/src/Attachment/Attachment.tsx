import * as React from 'react'

import { FileCheck, FileSolid, FileXmark } from '@pzh-ui/icons'

import { cva, type VariantProps } from 'class-variance-authority'

import { Button } from '../Button'
import { cn } from '../utils'

export type AttachmentState =
    'idle' | 'uploading' | 'processing' | 'error' | 'done'

export const attachmentVariants = cva(
    [
        'group/attachment',
        'min-w-0 relative grid w-full max-w-full shrink-0 items-start',
        'rounded-lg border border-border bg-surface text-foreground',
        'transition-[background-color,border-color,box-shadow] duration-150',

        // Focus
        'focus-within:border-transparent',
        'focus-within:ring-2',
        'focus-within:ring-focus',

        // States
        'data-[state=done]:border-success-border',
        'data-[state=error]:border-destructive',
    ],
    {
        variants: {
            size: {
                default:
                    'gap-x-4 px-5 pt-4 pb-2 data-[state=done]:pb-4 data-[state=error]:pb-4',
                s: 'gap-x-3 px-4 py-3',
                xs: 'gap-x-2 rounded px-3 py-2',
            },
            orientation: {
                horizontal: 'grid-cols-[auto_minmax(0,1fr)_auto]',
                vertical:
                    'w-60 grid-cols-[minmax(0,1fr)_auto] grid-rows-[auto_auto_auto]',
            },
        },
        defaultVariants: {
            size: 'default',
            orientation: 'horizontal',
        },
    }
)

export type AttachmentProps = React.ComponentProps<'div'> &
    VariantProps<typeof attachmentVariants> & {
        state?: AttachmentState
    }

function Attachment({
    className,
    state = 'idle',
    size = 'default',
    orientation = 'horizontal',
    ...props
}: AttachmentProps) {
    const resolvedSize = size ?? 'default'
    const resolvedOrientation = orientation ?? 'horizontal'

    return (
        <div
            data-slot="attachment"
            data-state={state}
            data-size={resolvedSize}
            data-orientation={resolvedOrientation}
            className={cn(
                attachmentVariants({
                    size: resolvedSize,
                    orientation: resolvedOrientation,
                }),
                className
            )}
            {...props}
        />
    )
}

const attachmentMediaVariants = cva(
    [
        'relative col-start-1 row-start-1',
        'size-6 shrink-0 text-info-border',
        'flex items-center justify-center',
        '[&>svg]:h-5 [&>svg]:w-4',

        // Sizes
        'group-data-[size=s]/attachment:size-5',
        'group-data-[size=s]/attachment:[&>svg]:h-5',
        'group-data-[size=s]/attachment:[&>svg]:w-4',
        'group-data-[size=xs]/attachment:size-4',
        'group-data-[size=xs]/attachment:[&>svg]:size-3.5',

        // Vertical layout
        'group-data-[orientation=vertical]/attachment:col-span-2',
        'group-data-[orientation=vertical]/attachment:col-start-1',
        'group-data-[orientation=vertical]/attachment:size-5',
        'group-data-[orientation=vertical]/attachment:[&>svg]:h-5',
        'group-data-[orientation=vertical]/attachment:[&>svg]:w-4',
    ],
    {
        variants: {
            variant: {
                icon: '',
                image: [
                    'size-12 rounded overflow-hidden bg-surface-muted text-foreground',
                    '[&>img]:size-full [&>img]:object-cover',
                    'group-data-[state=idle]/attachment:opacity-70',
                    'group-data-[state=uploading]/attachment:opacity-70',
                    'group-data-[state=processing]/attachment:opacity-70',
                ],
            },
        },
        defaultVariants: {
            variant: 'icon',
        },
    }
)

export type AttachmentMediaProps = React.ComponentProps<'div'> &
    VariantProps<typeof attachmentMediaVariants>

function AttachmentMedia({
    className,
    variant = 'icon',
    children,
    ...props
}: AttachmentMediaProps) {
    const defaultIcon = variant === 'icon' && children == null

    return (
        <div
            data-slot="attachment-media"
            data-variant={variant}
            className={cn(attachmentMediaVariants({ variant }), className)}
            {...props}>
            {defaultIcon ? (
                <>
                    <FileSolid
                        data-slot="attachment-file-icon"
                        aria-hidden="true"
                        className="group-data-[state=done]/attachment:hidden group-data-[state=error]/attachment:hidden"
                    />

                    <FileCheck
                        data-slot="attachment-success-icon"
                        aria-hidden="true"
                        className="hidden group-data-[state=done]/attachment:block"
                    />

                    <FileXmark
                        data-slot="attachment-error-icon"
                        aria-hidden="true"
                        className="hidden group-data-[state=error]/attachment:block"
                    />
                </>
            ) : (
                children
            )}
        </div>
    )
}

export type AttachmentContentProps = React.ComponentProps<'div'>

function AttachmentContent({ className, ...props }: AttachmentContentProps) {
    return (
        <div
            data-slot="attachment-content"
            className={cn(
                'min-w-0 col-start-2 row-start-1 max-w-full',
                'group-data-[orientation=vertical]/attachment:col-span-2',
                'group-data-[orientation=vertical]/attachment:col-start-1',
                'group-data-[orientation=vertical]/attachment:row-start-2',
                'group-data-[orientation=vertical]/attachment:mt-3',
                className
            )}
            {...props}
        />
    )
}

export type AttachmentTitleProps = React.ComponentProps<'span'>

function AttachmentTitle({ className, ...props }: AttachmentTitleProps) {
    return (
        <span
            data-slot="attachment-title"
            className={cn(
                'min-w-0 text-heading-xs font-bold block max-w-full truncate',
                'group-data-[size=s]/attachment:text-s',
                'group-data-[size=xs]/attachment:text-xs',
                className
            )}
            {...props}
        />
    )
}

export type AttachmentDescriptionProps = React.ComponentProps<'span'>

function AttachmentDescription({
    className,
    ...props
}: AttachmentDescriptionProps) {
    return (
        <span
            data-slot="attachment-description"
            className={cn(
                'mt-1 min-w-0 gap-x-5 text-xs flex max-w-full flex-wrap items-center text-text-muted',
                'group-data-[state=done]/attachment:text-success',
                'group-data-[state=error]/attachment:text-destructive',
                'group-data-[size=xs]/attachment:mt-0.5',
                'group-data-[size=xs]/attachment:text-xs',
                className
            )}
            {...props}
        />
    )
}

export type AttachmentActionsProps = React.ComponentProps<'div'>

function AttachmentActions({ className, ...props }: AttachmentActionsProps) {
    return (
        <div
            data-slot="attachment-actions"
            className={cn(
                'z-20 col-start-3 row-start-1',
                'flex h-full shrink-0 flex-col items-center justify-between self-stretch',
                'group-data-[orientation=vertical]/attachment:absolute',
                'group-data-[orientation=vertical]/attachment:right-4',
                className
            )}
            {...props}
        />
    )
}

export type AttachmentActionProps = React.ComponentProps<typeof Button>

function AttachmentAction({
    className,
    variant,
    size = 's',
    ...props
}: AttachmentActionProps) {
    return (
        <Button
            data-slot="attachment-action"
            variant={variant ?? 'default'}
            size={size}
            className={cn('size-3.5 p-0 [&_svg]:size-3.5 shrink-0', className)}
            {...props}
        />
    )
}

export type AttachmentProgressProps = Omit<
    React.ComponentProps<'div'>,
    'children'
> & {
    value: number
    children?: React.ReactNode
}

function AttachmentProgress({
    className,
    value,
    children,
    ...props
}: AttachmentProgressProps) {
    const resolvedValue = Number.isFinite(value)
        ? Math.min(100, Math.max(0, value))
        : 0

    return (
        <div
            {...props}
            data-slot="attachment-progress"
            role="progressbar"
            aria-label={props['aria-label'] ?? 'Upload progress'}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={resolvedValue}
            className={cn(
                'gap-4 col-start-1 col-end-4 row-start-2 grid grid-cols-[minmax(0,1fr)_auto] items-center',
                'group-data-[orientation=vertical]/attachment:col-end-3',
                'group-data-[orientation=vertical]/attachment:row-start-3',
                'group-data-[size=xs]/attachment:gap-2',
                className
            )}>
            <span
                data-slot="attachment-progress-track"
                className="h-1 overflow-hidden rounded-full bg-surface-disabled">
                <span
                    data-slot="attachment-progress-indicator"
                    className="block h-full rounded-full bg-success transition-[width] duration-200"
                    style={{ width: `${resolvedValue}%` }}
                />
            </span>

            <span
                data-slot="attachment-progress-value"
                aria-hidden="true"
                className="min-w-8 text-xs group-data-[size=s]/attachment:text-xs group-data-[size=xs]/attachment:text-xs text-right text-text-muted">
                {children ?? `${Math.round(resolvedValue)}%`}
            </span>
        </div>
    )
}

type AttachmentTriggerRenderProps = React.ButtonHTMLAttributes<HTMLElement> & {
    'data-slot': 'attachment-trigger'
}

export type AttachmentTriggerProps = React.ComponentProps<'button'> & {
    render?: (props: AttachmentTriggerRenderProps) => React.ReactNode
}

function AttachmentTrigger({
    className,
    render,
    type = 'button',
    children,
    ...props
}: AttachmentTriggerProps) {
    const triggerProps = {
        ...props,
        type,
        'data-slot': 'attachment-trigger' as const,
        className: cn('inset-0 absolute z-10 outline-none', className),
        children,
    }

    if (render) {
        return render(triggerProps)
    }

    return <button {...triggerProps} />
}

export type AttachmentGroupProps = React.ComponentProps<'div'>

function AttachmentGroup({ className, ...props }: AttachmentGroupProps) {
    return (
        <div
            data-slot="attachment-group"
            className={cn('min-w-0 gap-8 flex flex-col', className)}
            {...props}
        />
    )
}

export {
    Attachment,
    AttachmentAction,
    AttachmentActions,
    AttachmentContent,
    AttachmentDescription,
    AttachmentGroup,
    AttachmentMedia,
    AttachmentProgress,
    AttachmentTitle,
    AttachmentTrigger,
}
