import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import {
    Modal,
    ModalBody,
    ModalClose,
    ModalDescription,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    ModalTrigger,
} from './Modal'

const meta = {
    title: 'Componenten/Modal',
    component: Modal,
    parameters: { layout: 'centered' },
    args: { size: 'm' },
    argTypes: { size: { control: 'select', options: ['m', 'l'] } },
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => (
        <ModalTrigger>
            <Button variant="secondary">Open modal</Button>
            <Modal {...args}>
                <ModalHeader>
                    <ModalTitle>Title in the header</ModalTitle>
                    <ModalDescription>Subtitel</ModalDescription>
                </ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </ModalBody>
                <ModalFooter>
                    <Button variant="link">Text button</Button>
                    <div className="gap-2 flex flex-wrap">
                        <ModalClose variant="secondary">Right 1</ModalClose>
                        <ModalClose variant="cta">Right 2</ModalClose>
                    </div>
                </ModalFooter>
            </Modal>
        </ModalTrigger>
    ),
}

export const Large: Story = { ...Default, args: { size: 'l' } }
