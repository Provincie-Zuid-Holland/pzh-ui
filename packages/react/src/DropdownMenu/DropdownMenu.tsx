'use client'

import * as React from 'react'
import {
    composeRenderProps,
    Header,
    Menu,
    MenuItem,
    MenuSection,
    MenuTrigger,
    Separator,
    SubmenuTrigger,
    type MenuProps,
    type MenuSectionProps,
} from 'react-aria-components'

import { AngleRight } from '@pzh-ui/icons'

import { Button, type ButtonProps } from '../Button'
import { Popover, type PopoverProps } from '../Popover'
import { cn } from '../utils'

const SizeContext = React.createContext<'s' | 'm'>('m')

export type DropdownMenuProps = React.ComponentProps<typeof MenuTrigger>

function DropdownMenu(props: DropdownMenuProps) {
    return <MenuTrigger {...props} />
}

export type DropdownMenuTriggerProps = ButtonProps

function DropdownMenuTrigger(props: DropdownMenuTriggerProps) {
    return <Button data-slot="dropdown-menu-trigger" {...props} />
}

export type DropdownMenuContentProps<T extends object> = MenuProps<T> & {
    size?: 's' | 'm'
    popoverProps?: Omit<PopoverProps, 'children' | 'size'>
}

function DropdownMenuContent<T extends object>({
    size = 'm',
    popoverProps,
    className,
    ...props
}: DropdownMenuContentProps<T>) {
    return (
        <SizeContext.Provider value={size}>
            <Popover
                size={size}
                placement="bottom end"
                offset={4}
                {...popoverProps}
                className={cn('w-48 overflow-auto', popoverProps?.className)}>
                <Menu
                    data-slot="dropdown-menu-content"
                    data-size={size}
                    className={composeRenderProps(className, className =>
                        cn('p-1 outline-none', className)
                    )}
                    {...props}
                />
            </Popover>
        </SizeContext.Provider>
    )
}

export type DropdownMenuItemProps = React.ComponentProps<typeof MenuItem> & {
    variant?: 'default' | 'destructive'
    inset?: boolean
}

function DropdownMenuItem({
    className,
    children,
    variant = 'default',
    inset = false,
    ...props
}: DropdownMenuItemProps) {
    const size = React.useContext(SizeContext)
    return (
        <MenuItem
            data-slot="dropdown-menu-item"
            data-variant={variant}
            textValue={typeof children === 'string' ? children : undefined}
            className={composeRenderProps(className, className =>
                cn(
                    'gap-2 rounded px-4 font-bold flex cursor-pointer items-center text-primary outline-none select-none',
                    'data-focused:bg-surface-muted data-focused:ring-2 data-focused:ring-focus data-focused:ring-inset data-hovered:bg-surface-muted',
                    '[&_svg]:size-4 data-disabled:pointer-events-none data-disabled:text-text-disabled [&_svg]:shrink-0',
                    size === 's'
                        ? 'min-h-8 py-1 text-xs'
                        : 'min-h-10 py-2 text-s',
                    variant === 'destructive' && 'text-destructive',
                    inset && 'pl-8',
                    className
                )
            )}
            {...props}>
            {children}
        </MenuItem>
    )
}

export type DropdownMenuGroupProps<T extends object> = MenuSectionProps<T>

function DropdownMenuGroup<T extends object>(props: DropdownMenuGroupProps<T>) {
    return <MenuSection {...props} />
}

export type DropdownMenuLabelProps = React.ComponentProps<typeof Header>

function DropdownMenuLabel({ className, ...props }: DropdownMenuLabelProps) {
    return (
        <Header
            data-slot="dropdown-menu-label"
            className={cn(
                'px-3 py-2 text-xs font-bold text-text-muted',
                className
            )}
            {...props}
        />
    )
}

export type DropdownMenuSeparatorProps = React.ComponentProps<typeof Separator>

function DropdownMenuSeparator({
    className,
    ...props
}: DropdownMenuSeparatorProps) {
    return (
        <Separator
            data-slot="dropdown-menu-separator"
            className={cn('my-1 h-px border-0 bg-border', className)}
            {...props}
        />
    )
}

export type DropdownMenuSubProps = React.ComponentProps<typeof SubmenuTrigger>

function DropdownMenuSub(props: DropdownMenuSubProps) {
    return <SubmenuTrigger {...props} />
}

export type DropdownMenuSubTriggerProps = DropdownMenuItemProps

function DropdownMenuSubTrigger({
    children,
    ...props
}: DropdownMenuSubTriggerProps) {
    return (
        <DropdownMenuItem
            textValue={typeof children === 'string' ? children : undefined}
            {...props}>
            {composeRenderProps(children, children => (
                <>
                    {children}
                    <AngleRight
                        aria-hidden="true"
                        className="cn-rtl-flip ml-auto"
                    />
                </>
            ))}
        </DropdownMenuItem>
    )
}

export type DropdownMenuSubContentProps<T extends object> =
    DropdownMenuContentProps<T>

function DropdownMenuSubContent<T extends object>({
    popoverProps,
    ...props
}: DropdownMenuSubContentProps<T>) {
    return (
        <DropdownMenuContent
            {...props}
            popoverProps={{ placement: 'right top', ...popoverProps }}
        />
    )
}

export type DropdownMenuShortcutProps = React.ComponentProps<'span'>

function DropdownMenuShortcut({
    className,
    ...props
}: DropdownMenuShortcutProps) {
    return (
        <span
            aria-hidden="true"
            data-slot="dropdown-menu-shortcut"
            className={cn('text-xs ml-auto text-text-muted', className)}
            {...props}
        />
    )
}
export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuShortcut,
}
