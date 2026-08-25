'use client'

import * as React from 'react'
import {
    Button as ButtonPrimitive,
    composeRenderProps,
    Header as HeaderPrimitive,
    ListBoxItem as ListBoxItemPrimitive,
    ListBox as ListBoxPrimitive,
    ListBoxSection as ListBoxSectionPrimitive,
    Popover as PopoverPrimitive,
    SearchField,
    Select as SelectPrimitive,
    SelectValue as SelectValuePrimitive,
    Separator as SeparatorPrimitive,
    type ListBoxProps,
    type SearchFieldProps,
    type ListBoxSectionProps as SelectGroupProps,
    type SelectProps as SelectPrimitiveProps,
    type SelectValueProps,
} from 'react-aria-components'

import { AngleDown, MagnifyingGlass } from '@pzh-ui/icons'

import { type VariantProps } from 'class-variance-authority'

import { cn } from '../../utils'
import { inputControlVariants, inputPaddingVariants } from '../Input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../InputGroup'

type SelectSize = NonNullable<VariantProps<typeof inputControlVariants>['size']>

const SelectSizeContext = React.createContext<SelectSize>('l')

export type SelectProps<
    T extends object,
    M extends 'single' | 'multiple' = 'single',
> = Omit<SelectPrimitiveProps<T, M>, 'size'> &
    VariantProps<typeof inputControlVariants>

function Select<T extends object, M extends 'single' | 'multiple' = 'single'>({
    className,
    size,
    ...props
}: SelectProps<T, M>) {
    return (
        <SelectSizeContext.Provider value={size ?? 'l'}>
            <SelectPrimitive
                data-slot="select"
                data-size={size ?? 'l'}
                className={cn('group/select w-full', className)}
                {...props}
            />
        </SelectSizeContext.Provider>
    )
}

function SelectGroup<T extends object>({
    className,
    ...props
}: SelectGroupProps<T>) {
    return (
        <ListBoxSectionPrimitive
            data-slot="select-group"
            className={cn('scroll-my-1', className)}
            {...props}
        />
    )
}

function SelectValue<T extends object>({
    className,
    children,
    ...props
}: SelectValueProps<T>) {
    return (
        <SelectValuePrimitive
            data-slot="select-value"
            className={cn(
                'min-w-0 flex flex-1 text-left',
                'data-placeholder:text-text-subtle',
                className
            )}
            {...props}>
            {typeof children === 'function'
                ? children
                : ({ selectedItems, selectedText, defaultChildren }) =>
                      selectedItems.length > 1 ? selectedText : defaultChildren}
        </SelectValuePrimitive>
    )
}

function SelectTrigger({
    className,
    children,
    ...props
}: Omit<React.ComponentProps<typeof ButtonPrimitive>, 'children'> & {
    children?: React.ReactNode
}) {
    const size = React.useContext(SelectSizeContext)

    return (
        <ButtonPrimitive
            data-slot="select-trigger"
            data-size={size}
            className={composeRenderProps(className, className =>
                cn(
                    inputControlVariants({ size }),
                    inputPaddingVariants({ size }),

                    'gap-2 flex items-center justify-between',
                    'text-left',

                    'focus-visible:border-transparent',
                    'focus-visible:ring-2',
                    'focus-visible:ring-focus',

                    'disabled:pointer-events-none',
                    'disabled:cursor-not-allowed',
                    'disabled:bg-input-disabled',
                    'disabled:text-text-subtle',

                    '*:data-[slot=select-value]:truncate',

                    className
                )
            )}
            {...props}>
            {children}

            <AngleDown
                className={cn(
                    'size-4 shrink-0',
                    'pointer-events-none',
                    'text-text-muted',
                    'transition-transform duration-200',
                    'group-data-open/select:rotate-180'
                )}
            />
        </ButtonPrimitive>
    )
}

function SelectContent({
    className,
    children,
    placement = 'bottom',
    offset = 2,
    crossOffset = 0,
    ...props
}: Omit<
    React.ComponentProps<typeof PopoverPrimitive>,
    'className' | 'children'
> & {
    className?: string
    children?: React.ReactNode
}) {
    return (
        <SelectPopover
            className={className}
            placement={placement}
            offset={offset}
            crossOffset={crossOffset}
            {...props}>
            <SelectList>{children}</SelectList>
        </SelectPopover>
    )
}

function SelectPopover({
    className,
    children,
    placement = 'bottom start',
    offset = 2,
    crossOffset = 0,
    ...props
}: Omit<
    React.ComponentProps<typeof PopoverPrimitive>,
    'className' | 'children'
> & {
    className?: string
    children?: React.ReactNode
}) {
    return (
        <PopoverPrimitive
            data-slot="select-content"
            placement={placement}
            offset={offset}
            crossOffset={crossOffset}
            className={cn(
                [
                    'z-50',
                    'w-(--trigger-width)',
                    'overflow-hidden',
                    'rounded',
                    'bg-surface',
                    'shadow-popover',

                    'data-entering:animate-in',
                    'data-entering:fade-in-0',
                    'data-entering:zoom-in-95',

                    'data-exiting:animate-out',
                    'data-exiting:fade-out-0',
                    'data-exiting:zoom-out-95',
                ],
                className
            )}
            {...props}>
            {children}
        </PopoverPrimitive>
    )
}

function SelectList<T extends object>({
    className,
    ...props
}: ListBoxProps<T>) {
    const size = React.useContext(SelectSizeContext)

    return (
        <ListBoxPrimitive
            data-slot="select-list"
            data-size={size}
            className={cn(
                [
                    'group/select-list',
                    'max-h-64',
                    'overflow-x-hidden',
                    'overflow-y-auto',
                    'outline-none',
                ],
                className
            )}
            {...props}
        />
    )
}

function SelectInput({
    className,
    'aria-label': ariaLabel = 'Zoeken',
    ...props
}: SearchFieldProps) {
    const size = React.useContext(SelectSizeContext)

    return (
        <SearchField
            {...props}
            aria-label={ariaLabel}
            autoFocus
            data-slot="select-input-wrapper"
            className={cn('p-2 pb-0', className)}>
            <InputGroup size={size}>
                <InputGroupInput
                    data-slot="select-input"
                    className="[&::-webkit-search-cancel-button]:hidden"
                />

                <InputGroupAddon>
                    <MagnifyingGlass className="shrink-0 opacity-50" />
                </InputGroupAddon>
            </InputGroup>
        </SearchField>
    )
}

function SelectLabel({
    className,
    ...props
}: React.ComponentProps<typeof HeaderPrimitive>) {
    const size = React.useContext(SelectSizeContext)

    return (
        <HeaderPrimitive
            data-slot="select-label"
            data-size={size}
            className={cn(
                'py-1 font-bold text-primary',
                size === 'l' ? 'text-s px-4' : 'text-xs px-2',
                className
            )}
            {...props}
        />
    )
}

function SelectItem({
    className,
    children,
    ...props
}: React.ComponentProps<typeof ListBoxItemPrimitive>) {
    const size = React.useContext(SelectSizeContext)

    return (
        <ListBoxItemPrimitive
            data-slot="select-item"
            data-size={size}
            textValue={typeof children === 'string' ? children : undefined}
            className={cn(
                [
                    'flex w-full items-center',
                    'cursor-default',
                    'select-none',
                    'text-text-editor',
                    'outline-none',

                    // Hover
                    'data-hovered:bg-surface-subtle',

                    // Active
                    'data-pressed:bg-info-border',

                    // Focus
                    'data-focused:bg-surface-subtle',
                    'data-focused:ring-2',
                    'data-focused:ring-inset',
                    'data-focused:ring-focus',

                    // Selected
                    'data-selected:bg-surface-muted',

                    // Disabled
                    'data-disabled:pointer-events-none',
                    'data-disabled:bg-surface-muted',
                    'data-disabled:text-text-subtle',
                ],
                size === 'l' && 'min-h-12 px-4 py-2 text-m',
                size === 'm' && 'min-h-10 px-2 py-2 text-s',
                className
            )}
            {...props}>
            {children}
        </ListBoxItemPrimitive>
    )
}

function SelectSeparator({
    className,
    ...props
}: React.ComponentProps<typeof SeparatorPrimitive>) {
    return (
        <SeparatorPrimitive
            data-slot="select-separator"
            className={cn(
                'my-1 pointer-events-none h-px bg-border-subtle',
                className
            )}
            {...props}
        />
    )
}

function SelectEmpty({ className, ...props }: React.ComponentProps<'div'>) {
    const size = React.useContext(SelectSizeContext)

    return (
        <div
            data-slot="select-empty"
            data-size={size}
            className={cn(
                [
                    'hidden w-full',
                    'justify-center',
                    'py-2',
                    'text-center',
                    'text-text-subtle',
                    'group-data-empty/select-list:flex',
                ],
                size === 'l' ? 'text-m' : 'text-s',
                className
            )}
            {...props}
        />
    )
}

export {
    Select,
    SelectContent,
    SelectEmpty,
    SelectGroup,
    SelectInput,
    SelectItem,
    SelectLabel,
    SelectList,
    SelectPopover,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
}
