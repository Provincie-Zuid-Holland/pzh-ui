import { Node } from '@react-types/shared'
import classNames from 'classnames'
import { useRef } from 'react'
import {
    useTab,
    useTabList,
    useTabPanel,
    AriaTabListProps,
    AriaTabPanelProps,
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
                className="flex flex-column border-b-2 border-pzh-gray-400">
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
            className={classNames('mr-4 -mb-0.5 border-b-2', {
                'border-pzh-green text-pzh-green font-bold':
                    tabProps['aria-selected'],
                'border-pzh-gray-400': !tabProps['aria-selected'],
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
