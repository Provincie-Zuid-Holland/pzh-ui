import type * as React from 'react'

import { RotateLeft, XmarkLarge } from '@pzh-ui/icons'

import type { Meta, StoryObj } from '@storybook/react-vite'

import {
    Attachment,
    AttachmentAction,
    AttachmentActions,
    AttachmentContent,
    AttachmentDescription,
    AttachmentGroup,
    AttachmentMedia,
    AttachmentProgress,
    AttachmentTitle,
    type AttachmentProps,
    type AttachmentState,
} from './Attachment'

const fileName = 'Subsidieregeling_duurzame_innovaties.pdf'

type AttachmentExampleProps = Pick<
    AttachmentProps,
    'className' | 'orientation' | 'size'
> & {
    state: AttachmentState
}

function AttachmentExample({ state, ...props }: AttachmentExampleProps) {
    const descriptions = {
        idle: (
            <>
                <span>204 KB</span>
                <span>In de wachtrij</span>
            </>
        ),
        uploading: (
            <>
                <span>157 KB / 204 KB</span>
                <span>Nog 5 seconden te gaan</span>
            </>
        ),
        processing: <span>Upload wordt verwerkt</span>,
        done: <span className="font-bold">Upload succesvol</span>,
        error: <span className="font-bold">Upload mislukt</span>,
    } satisfies Record<AttachmentState, React.ReactNode>

    return (
        <Attachment state={state} {...props}>
            <AttachmentMedia />

            <AttachmentContent>
                <AttachmentTitle>{fileName}</AttachmentTitle>
                <AttachmentDescription>
                    {descriptions[state]}
                </AttachmentDescription>
            </AttachmentContent>

            <AttachmentActions>
                <AttachmentAction aria-label="Bijlage verwijderen">
                    <XmarkLarge />
                </AttachmentAction>

                {state === 'error' && (
                    <AttachmentAction aria-label="Upload opnieuw proberen">
                        <RotateLeft />
                    </AttachmentAction>
                )}
            </AttachmentActions>

            {state === 'idle' && (
                <AttachmentProgress aria-label="Uploadvoortgang" value={0} />
            )}

            {state === 'uploading' && (
                <AttachmentProgress aria-label="Uploadvoortgang" value={75} />
            )}

            {state === 'processing' && (
                <AttachmentProgress
                    aria-label="Verwerkingsvoortgang"
                    value={100}
                />
            )}
        </Attachment>
    )
}

const meta = {
    title: 'Componenten/Attachment',
    component: Attachment,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        state: {
            control: 'select',
            options: ['idle', 'uploading', 'processing', 'done', 'error'],
        },
        size: {
            control: 'select',
            options: ['default', 's', 'xs'],
        },
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
        },
    },
    args: {
        state: 'idle',
        size: 'default',
        orientation: 'horizontal',
    },
} satisfies Meta<typeof Attachment>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => (
        <div className="w-150 max-w-[calc(100vw-2rem)]">
            <AttachmentExample
                state={args.state ?? 'idle'}
                size={args.size}
                orientation={args.orientation}
            />
        </div>
    ),
}

export const Uploading: Story = {
    args: {
        state: 'uploading',
    },
    render: args => (
        <div className="w-150 max-w-[calc(100vw-2rem)]">
            <AttachmentExample
                state="uploading"
                size={args.size}
                orientation={args.orientation}
            />
        </div>
    ),
}

export const Success: Story = {
    args: {
        state: 'done',
    },
    render: args => (
        <div className="w-150 max-w-[calc(100vw-2rem)]">
            <AttachmentExample
                state="done"
                size={args.size}
                orientation={args.orientation}
            />
        </div>
    ),
}

export const Error: Story = {
    args: {
        state: 'error',
    },
    render: args => (
        <div className="w-150 max-w-[calc(100vw-2rem)]">
            <AttachmentExample
                state="error"
                size={args.size}
                orientation={args.orientation}
            />
        </div>
    ),
}

export const AllStates: Story = {
    render: args => (
        <AttachmentGroup className="w-150 max-w-[calc(100vw-2rem)]">
            <AttachmentExample
                state="idle"
                size={args.size}
                orientation="horizontal"
            />
            <AttachmentExample
                state="uploading"
                size={args.size}
                orientation="horizontal"
            />
            <AttachmentExample
                state="done"
                size={args.size}
                orientation="horizontal"
            />
            <AttachmentExample
                state="error"
                size={args.size}
                orientation="horizontal"
            />
        </AttachmentGroup>
    ),
}
