import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '../Input'
import { Field, FieldDescription, FieldError, FieldLabel } from './Field'

const meta = {
    title: 'Componenten/Form/Field',
    component: Field,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        Story => (
            <div className="w-[min(400px,calc(100vw-2rem))]">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Field>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <Field className="flex-col">
            <FieldLabel htmlFor="name">Naam</FieldLabel>

            <FieldDescription>Vul je volledige naam in.</FieldDescription>

            <Input id="name" name="name" placeholder="Voor- en achternaam" />
        </Field>
    ),
}

export const Required: Story = {
    render: () => (
        <Field className="flex-col">
            <FieldLabel htmlFor="email" required>
                E-mailadres
            </FieldLabel>

            <FieldDescription>
                We gebruiken je e-mailadres om contact met je op te nemen.
            </FieldDescription>

            <Input
                id="email"
                name="email"
                type="email"
                placeholder="naam@voorbeeld.nl"
                required
            />
        </Field>
    ),
}

export const WithoutDescription: Story = {
    render: () => (
        <Field className="flex-col">
            <FieldLabel htmlFor="title">Titel</FieldLabel>

            <Input id="title" name="title" placeholder="Vul een titel in" />
        </Field>
    ),
}

export const Invalid: Story = {
    render: () => (
        <Field className="flex-col gap-0">
            <div className="flex flex-col gap-2">
                <FieldLabel htmlFor="email-invalid" required>
                    E-mailadres
                </FieldLabel>

                <FieldDescription>
                    Vul een geldig e-mailadres in.
                </FieldDescription>

                <Input
                    id="email-invalid"
                    name="email-invalid"
                    type="email"
                    defaultValue="ongeldig-emailadres"
                    aria-invalid
                    aria-describedby="email-invalid-error"
                />
            </div>

            <FieldError id="email-invalid-error">
                Vul een geldig e-mailadres in.
            </FieldError>
        </Field>
    ),
}

export const Disabled: Story = {
    render: () => (
        <Field className="flex-col" data-disabled="true">
            <FieldLabel htmlFor="disabled">Gebruikersnaam</FieldLabel>

            <FieldDescription>
                Dit veld kan momenteel niet worden aangepast.
            </FieldDescription>

            <Input id="disabled" name="disabled" defaultValue="Stef" disabled />
        </Field>
    ),
}

export const ReadOnly: Story = {
    render: () => (
        <Field className="flex-col">
            <FieldLabel htmlFor="readonly">Referentienummer</FieldLabel>

            <FieldDescription>
                Dit nummer wordt automatisch gegenereerd.
            </FieldDescription>

            <Input
                id="readonly"
                name="readonly"
                defaultValue="PZH-2026-001"
                readOnly
            />
        </Field>
    ),
}
