import { Node } from '@react-types/shared'
import classNames from 'classnames'
import { useRef } from 'react'
import {
    AriaTabListProps,
    AriaTabPanelProps,
    useTab,
    useTabList,
    useTabPanel,
} from 'react-aria'
import { Item, TabListState, useTabListState } from 'react-stately'

export interface TabsProps extends AriaTabListProps<object> {}

interface TabPanelProps extends AriaTabPanelProps {
    state: TabListState<object>
}

interface TabProps {
    item: Node<object>
    state: TabListState<object>
}

export function Tabs(props: TabsProps) {
    const state = useTabListState(props)
    const ref = useRef(null)
    const { tabListProps } = useTabList(props, state, ref)

    return (
        <>
            <div
                {...tabListProps}
                ref={ref}
                className="flex-column border-pzh-gray-300 flex gap-4 border-b"
                data-testid="tabs">
                {[...state.collection].map(item => (
                    <Tab key={item.key} item={item} state={state} />
                ))}
            </div>
            <TabPanel key={state.selectedItem?.key} state={state} />
        </>
    )
}

export const TabItem = Item

function Tab({ item, state }: TabProps) {
    const { key, rendered } = item
    const ref = useRef(null)
    const { tabProps } = useTab({ key }, state, ref)

    return (
        <div
            {...tabProps}
            ref={ref}
            className={classNames('-mb-px pb-1 font-bold', {
                'border-pzh-green text-pzh-green border-b-[3px]':
                    tabProps['aria-selected'],
                'border-pzh-gray-400 text-pzh-blue': !tabProps['aria-selected'],
                'text-pzh-gray-400': tabProps['aria-disabled'],
                'cursor-pointer': !tabProps['aria-disabled'],
            })}>
            {rendered}
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
