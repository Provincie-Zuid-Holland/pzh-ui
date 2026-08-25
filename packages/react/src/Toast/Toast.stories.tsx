import { useEffect } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { toast, Toaster } from './Toast'

const description = 'Sed augue ipsum, egestas nec, vestibulum et, malesuada.'

const positions = [
    { position: 'top-left', label: 'Linksboven' },
    { position: 'top-center', label: 'Gecentreerd boven' },
    { position: 'top-right', label: 'Rechtsboven' },
    { position: 'bottom-left', label: 'Linksonder' },
    { position: 'bottom-center', label: 'Gecentreerd onder' },
    { position: 'bottom-right', label: 'Rechtsonder' },
] as const

const meta = {
    title: 'Componenten/Toast',
    component: Toaster,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Toaster>

export default meta

type Story = StoryObj<typeof meta>

function AllVariantsPreview() {
    useEffect(() => {
        const options = {
            description,
            duration: Infinity,
            toasterId: 'toast-variants',
        }

        const ids = [
            toast.error('Error', { ...options, id: 'toast-error' }),
            toast.success('Success', { ...options, id: 'toast-success' }),
            toast.warning('Warning', { ...options, id: 'toast-warning' }),
            toast.info('Info', { ...options, id: 'toast-info' }),
        ]

        return () => ids.forEach(id => toast.dismiss(id))
    }, [])

    return (
        <Toaster
            id="toast-variants"
            position="top-center"
            expand
            gap={42}
            visibleToasts={4}
        />
    )
}

export const AllVariants: Story = {
    render: () => <AllVariantsPreview />,
}

function AllPositionsPreview() {
    return (
        <>
            <div className="gap-3 sm:grid-cols-3 grid grid-cols-2">
                {positions.map(({ position, label }) => (
                    <Button
                        key={position}
                        size="m"
                        onPress={() =>
                            toast.info(label, {
                                description: `Deze toast staat ${label.toLowerCase()}.`,
                                toasterId: `toast-position-${position}`,
                            })
                        }>
                        {label}
                    </Button>
                ))}
            </div>

            {positions.map(({ position }) => (
                <Toaster
                    key={position}
                    id={`toast-position-${position}`}
                    position={position}
                />
            ))}
        </>
    )
}

export const AllPositions: Story = {
    render: () => <AllPositionsPreview />,
}

export const Interactive: Story = {
    render: () => (
        <>
            <div className="gap-3 flex flex-wrap justify-center">
                <Button
                    size="m"
                    onPress={() => toast.info('Info', { description })}>
                    Info
                </Button>
                <Button
                    size="m"
                    onPress={() => toast.warning('Warning', { description })}>
                    Warning
                </Button>
                <Button
                    size="m"
                    onPress={() => toast.success('Success', { description })}>
                    Success
                </Button>
                <Button
                    size="m"
                    onPress={() => toast.error('Error', { description })}>
                    Error
                </Button>
            </div>
            <Toaster position="top-center" />
        </>
    ),
}
