import { CircleInfoSolid, XmarkLarge } from '@pzh-ui/icons'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Alert, AlertAction, AlertDescription, AlertTitle } from './Alert'

const meta = {
    title: 'Componenten/Alert',
    component: Alert,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'warning', 'positive', 'negative'],
        },
        size: {
            control: 'select',
            options: ['m', 's', 'xs'],
        },
    },
    args: {
        variant: 'default',
        size: 'm',
    },
    decorators: [
        Story => (
            <div className="w-[min(600px,calc(100vw-2rem))]">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => (
        <Alert {...args}>
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
                Your changes could not be saved. Please try again.
            </AlertDescription>
        </Alert>
    ),
}

export const Warning: Story = {
    args: {
        variant: 'warning',
    },
    render: args => (
        <Alert {...args}>
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>
                Your changes could not be saved. Please try again.
            </AlertDescription>
        </Alert>
    ),
}

export const WithIcon: Story = {
    render: args => (
        <Alert {...args}>
            <CircleInfoSolid size={16} className="min-w-4" />
            <AlertTitle>Scheduled maintenance</AlertTitle>
            <AlertDescription>
                The application will be unavailable tonight between 22:00 and
                23:00.
            </AlertDescription>
        </Alert>
    ),
}

export const TitleOnly: Story = {
    render: args => (
        <Alert {...args}>
            <AlertTitle>Your changes have been saved.</AlertTitle>
        </Alert>
    ),
}

export const WithLinks: Story = {
    render: args => (
        <Alert {...args}>
            <AlertTitle>
                Review the <a href="#">documentation</a>
            </AlertTitle>
            <AlertDescription>
                Read the <a href="#">migration guide</a> before upgrading your
                application.
            </AlertDescription>
        </Alert>
    ),
}

export const MultipleParagraphs: Story = {
    render: args => (
        <Alert {...args}>
            <AlertTitle>Installation required</AlertTitle>
            <AlertDescription>
                <p>Install the package using your preferred package manager.</p>
                <p>
                    After installation, import the component into your
                    application.
                </p>
                <ul>
                    <li>List item</li>
                    <li>List item</li>
                    <li>List item</li>
                </ul>
            </AlertDescription>
        </Alert>
    ),
}

export const WithAction: Story = {
    render: args => (
        <Alert {...args}>
            <AlertTitle>
                Review the <a href="#">documentation</a>
            </AlertTitle>
            <AlertDescription>
                Read the <a href="#">migration guide</a> before upgrading your
                application.
            </AlertDescription>
            <AlertAction>
                <button
                    type="button"
                    aria-label="Sluiten"
                    onClick={() => {}}
                    className="cursor-pointer">
                    <XmarkLarge size={14} className="min-w-3.5" />
                </button>
            </AlertAction>
        </Alert>
    ),
}
