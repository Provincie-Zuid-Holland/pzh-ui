import { ChevronRight, Plus } from '@pzh-ui/icons'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button, buttonVariants, LinkButton } from './Button'

const meta = {
    title: 'Componenten/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: [
                'primary',
                'secondary',
                'cta',
                'diapositive',
                'caution',
                'link',
                'default',
            ],
        },
        size: {
            control: 'select',
            options: ['l', 'm', 's'],
        },
        isDisabled: {
            control: 'boolean',
        },
        isPending: {
            control: 'boolean',
        },
    },
    args: {
        children: 'Label',
        variant: 'primary',
        size: 'l',
        isDisabled: false,
        isPending: false,
    },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => <Button {...args} />,
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
    },
    render: args => <Button {...args} />,
}

export const CallToAction: Story = {
    args: {
        variant: 'cta',
    },
    render: args => <Button {...args} />,
}

export const Diapositive: Story = {
    args: {
        variant: 'diapositive',
    },
    render: args => (
        <div className="p-8 bg-brand-blue-dark">
            <Button {...args} />
        </div>
    ),
}

export const Caution: Story = {
    args: {
        variant: 'caution',
    },
    render: args => <Button {...args} />,
}

export const Small: Story = {
    args: {
        size: 's',
    },
    render: args => <Button {...args} />,
}

export const Disabled: Story = {
    args: {
        isDisabled: true,
    },
    render: args => <Button {...args} />,
}

export const Pending: Story = {
    args: {
        isPending: true,
    },
    render: args => <Button {...args} />,
}

export const WithIcon: Story = {
    render: args => (
        <div className="gap-4 flex flex-col items-start">
            <Button {...args}>
                <Plus />
                Toevoegen
            </Button>

            <Button {...args}>
                Volgende
                <ChevronRight />
            </Button>
        </div>
    ),
}

export const Variants: Story = {
    render: args => (
        <div className="gap-4 flex flex-col items-start">
            <Button {...args} variant="primary">
                Primary
            </Button>

            <Button {...args} variant="secondary">
                Secondary
            </Button>

            <Button {...args} variant="cta">
                Call to action
            </Button>

            <Button {...args} variant="caution">
                Caution
            </Button>

            <div className="p-4 bg-brand-blue-dark">
                <Button {...args} variant="diapositive">
                    Diapositive
                </Button>
            </div>

            <Button {...args} variant="link">
                Link
            </Button>
        </div>
    ),
}

export const Sizes: Story = {
    render: args => (
        <div className="gap-4 flex items-center">
            <Button {...args} size="l">
                Large
            </Button>

            <Button {...args} size="m">
                Medium
            </Button>

            <Button {...args} size="s">
                Small
            </Button>
        </div>
    ),
}

export const WithDisabledVariants: Story = {
    render: args => (
        <div className="gap-4 flex flex-col items-start">
            <Button {...args} variant="primary" isDisabled>
                Primary
            </Button>

            <Button {...args} variant="secondary" isDisabled>
                Secondary
            </Button>

            <Button {...args} variant="cta" isDisabled>
                Call to action
            </Button>

            <Button {...args} variant="caution" isDisabled>
                Caution
            </Button>

            <div className="p-4 bg-brand-blue-dark">
                <Button {...args} variant="diapositive" isDisabled>
                    Diapositive
                </Button>
            </div>
        </div>
    ),
}

export const WithPendingVariants: Story = {
    render: args => (
        <div className="gap-4 flex flex-col items-start">
            <Button {...args} variant="primary" isPending>
                Primary
            </Button>

            <Button {...args} variant="secondary" isPending>
                Secondary
            </Button>

            <Button {...args} variant="cta" isPending>
                Call to action
            </Button>

            <Button {...args} variant="caution" isPending>
                Caution
            </Button>

            <div className="p-4 bg-brand-blue-dark">
                <Button {...args} variant="diapositive" isPending>
                    Diapositive
                </Button>
            </div>
        </div>
    ),
}

export const AsLink: Story = {
    render: args => (
        <LinkButton href="#" variant={args.variant} size={args.size}>
            Label
        </LinkButton>
    ),
}

export const AsPlainLink: Story = {
    render: () => (
        <a
            href="#"
            className={buttonVariants({ variant: 'secondary', size: 'm' })}>
            Inloggen
        </a>
    ),
}
