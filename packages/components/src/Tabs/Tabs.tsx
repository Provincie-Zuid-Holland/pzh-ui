import { Node } from '@react-types/shared'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import {
    AriaTabListProps,
    AriaTabPanelProps,
    useTab,
    useTabList,
    useTabPanel,
} from 'react-aria'
import { Item, TabListState, useTabListState } from 'react-stately'
import { cn } from '../utils'

export interface TabsProps extends AriaTabListProps<object> {
    variant?: 'underline' | 'filled'
    className?: string
}

interface TabPanelProps extends AriaTabPanelProps {
    state: TabListState<object>
}

interface TabProps {
    item: Node<object>
    state: TabListState<object>
    variant?: 'underline' | 'filled'
}

export function Tabs({
    variant = 'underline',
    className,
    ...props
}: TabsProps) {
    const state = useTabListState(props)
    const ref = useRef(null)
    const { tabListProps } = useTabList(props, state, ref)

    return (
        <>
            <div
                {...tabListProps}
                ref={ref}
                className={cn(
                    'flex',
                    {
                        'border-pzh-gray-300 gap-6 border-b':
                            variant === 'underline',
                        'bg-pzh-gray-200 w-max gap-1 rounded-md p-1':
                            variant === 'filled',
                    },
                    className
                )}
                data-testid="tabs">
                {[...state.collection].map(item => (
                    <Tab
                        key={item.key}
                        item={item}
                        state={state}
                        variant={variant}
                    />
                ))}
            </div>
            <TabPanel key={state.selectedItem?.key} state={state} />
        </>
    )
}

export const TabItem = Item

function Tab({ item, state, variant = 'underline' }: TabProps) {
    const { key, rendered } = item
    const ref = useRef(null)
    const { tabProps } = useTab({ key: key.toString() }, state, ref)
    const isSelected = tabProps['aria-selected']
    const isDisabled = tabProps['aria-disabled']

    const baseClass = {
        underline: 'relative -mb-px pb-1 font-bold',
        filled: 'relative font-bold px-4 py-2 h-10 flex items-center transition-colors duration-300',
    }

    const classMap = {
        underline: cn(baseClass.underline, {
            'text-pzh-green-500': isSelected,
            'text-pzh-blue-500 border-pzh-gray-400': !isSelected && !isDisabled,
            'text-pzh-gray-400': isDisabled,
            'cursor-pointer': !isDisabled,
        }),
        filled: cn(baseClass.filled, {
            'text-pzh-blue-500': isSelected,
            'text-pzh-gray-600': !isSelected && !isDisabled,
            'text-pzh-gray-400': isDisabled,
            'cursor-pointer': !isDisabled,
        }),
    }

    return (
        <div {...tabProps} ref={ref} className={classMap[variant]}>
            {variant === 'filled' && isSelected && (
                <motion.div
                    layoutId="tab-filled-bg"
                    className="bg-pzh-white absolute inset-0 rounded"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
            )}
            <span className="relative">{rendered}</span>
            {variant === 'underline' && isSelected && (
                <motion.div
                    layoutId="tab-underline"
                    className="bg-pzh-green-500 absolute right-0 bottom-0 left-0 h-[3px]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
            )}
        </div>
    )
}

function TabPanel({ state, ...props }: TabPanelProps) {
    const ref = useRef(null)
    const { tabPanelProps } = useTabPanel(props, state, ref)

    return (
        <div {...tabPanelProps} ref={ref}>
            {state.selectedItem?.props.children}
        </div>
    )
}
