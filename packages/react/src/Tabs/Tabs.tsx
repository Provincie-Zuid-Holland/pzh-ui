'use client'

import * as React from 'react'
import {
    TabList as TabListPrimitive,
    TabPanel as TabPanelPrimitive,
    Tab as TabPrimitive,
    Tabs as TabsPrimitive,
} from 'react-aria-components'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../utils'

type TabsSize = 'm' | 'l'

export type TabsProps = React.ComponentProps<typeof TabsPrimitive> & {
    size?: TabsSize
}

function Tabs({ className, size = 'l', ...props }: TabsProps) {
    return (
        <TabsPrimitive
            data-slot="tabs"
            data-size={size}
            className={cn(
                'group/tabs gap-6 flex',
                'data-[orientation=horizontal]:flex-col',
                'data-[orientation=vertical]:flex-row',
                className
            )}
            {...props}
        />
    )
}

const tabsListVariants = cva(
    [
        'group/tabs-list flex w-fit',
        'group-data-[orientation=horizontal]/tabs:flex-row',
        'group-data-[orientation=vertical]/tabs:flex-col',
    ],
    {
        variants: {
            variant: {
                default: [
                    'gap-1 rounded p-1 bg-surface-subtle',
                    'group-data-[orientation=vertical]/tabs:h-fit',
                ],
                line: [
                    'bg-transparent',
                    'group-data-[orientation=horizontal]/tabs:border-b',
                    'group-data-[orientation=horizontal]/tabs:border-border',
                    'group-data-[orientation=vertical]/tabs:gap-4',
                ],
            },
        },
        defaultVariants: {
            variant: 'line',
        },
    }
)

export type TabsListProps = React.ComponentProps<typeof TabListPrimitive> &
    VariantProps<typeof tabsListVariants>

function TabsList({ className, variant = 'line', ...props }: TabsListProps) {
    return (
        <TabListPrimitive
            data-slot="tabs-list"
            data-variant={variant}
            className={cn(tabsListVariants({ variant }), className)}
            {...props}
        />
    )
}

export type TabsTriggerProps = React.ComponentProps<typeof TabPrimitive>

function TabsTrigger({ className, ...props }: TabsTriggerProps) {
    return (
        <TabPrimitive
            data-slot="tabs-trigger"
            className={cn(
                'gap-2 relative inline-flex shrink-0 cursor-pointer items-center justify-center',
                'font-bold border border-transparent whitespace-nowrap text-foreground outline-none',
                'transition-[color,background-color,border-color,box-shadow] duration-150',
                'hover:text-success',
                'focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-inset',
                'data-disabled:pointer-events-none data-disabled:text-text-disabled',
                'data-selected:text-success',
                '[&_svg]:pointer-events-none [&_svg]:shrink-0',

                'group-data-[size=l]/tabs:text-s',
                'group-data-[size=m]/tabs:text-xs',

                'group-data-[orientation=horizontal]/tabs:h-12',
                'group-data-[orientation=horizontal]/tabs:px-3',
                'group-data-[orientation=horizontal]/tabs:[&_svg]:size-5',
                'group-data-[orientation=horizontal]/tabs:group-data-[size=m]/tabs:[&_svg]:size-4.5',

                'group-data-[orientation=vertical]/tabs:flex-col',
                'group-data-[orientation=vertical]/tabs:gap-0.5',
                'group-data-[orientation=vertical]/tabs:px-2',
                'group-data-[orientation=vertical]/tabs:h-14',
                'group-data-[orientation=vertical]/tabs:[&_svg]:size-6',

                'group-data-[variant=default]/tabs-list:rounded-sm',
                'group-data-[variant=default]/tabs-list:px-4',
                'group-data-[variant=default]/tabs-list:data-selected:bg-background',
                'group-data-[variant=default]/tabs-list:data-selected:shadow-sm',

                'after:pointer-events-none after:absolute after:bg-success',
                'after:ease-out after:opacity-0 after:transition-[opacity,transform] after:duration-200',
                'group-data-[variant=line]/tabs-list:data-selected:after:opacity-100',
                'group-data-[orientation=horizontal]/tabs:after:-bottom-px',
                'group-data-[orientation=horizontal]/tabs:after:inset-x-0',
                'group-data-[orientation=horizontal]/tabs:after:h-0.75',
                'group-data-[orientation=horizontal]/tabs:after:origin-center',
                'group-data-[orientation=horizontal]/tabs:after:scale-x-0',
                'group-data-[orientation=horizontal]/tabs:data-selected:after:scale-x-100',
                'group-data-[orientation=vertical]/tabs:after:inset-y-0',
                'group-data-[orientation=vertical]/tabs:after:left-0',
                'group-data-[orientation=vertical]/tabs:after:w-1',
                'group-data-[orientation=vertical]/tabs:after:origin-center',
                'group-data-[orientation=vertical]/tabs:after:scale-y-0',
                'group-data-[orientation=vertical]/tabs:data-selected:after:scale-y-100',
                className
            )}
            {...props}
        />
    )
}

export type TabsContentProps = React.ComponentProps<typeof TabPanelPrimitive>

function TabsContent({ className, ...props }: TabsContentProps) {
    return (
        <TabPanelPrimitive
            data-slot="tabs-content"
            className={cn('flex-1 outline-none', className)}
            {...props}
        />
    )
}

export { Tabs, TabsContent, TabsList, TabsTrigger, tabsListVariants }
