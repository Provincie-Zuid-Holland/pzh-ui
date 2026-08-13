import type { Meta, StoryObj } from '@storybook/react-vite'

import { MagnifyingGlass } from '@pzh-ui/icons'

import { Button } from '../Button'
import { Field, FieldDescription, FieldError, FieldLabel } from './Field'
import { Input } from './Input'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from './InputGroup'
import { NumberInput } from './NumberInput'
import { PasswordInput } from './PasswordInput'
import { Textarea } from './Textarea'

const meta = {
    title: 'Componenten/Form',
    parameters: {
        layout: 'centered',
    },
    decorators: [
        Story => (
            <div className="w-[min(500px,calc(100vw-2rem))]">
                <Story />
            </div>
        ),
    ],
} satisfies Meta

export default meta

type Story = StoryObj

export const Default: Story = {
    render: () => (
        <form
            className="flex w-full flex-col gap-6"
            onSubmit={event => event.preventDefault()}>
            <Field className="flex-col">
                <FieldLabel htmlFor="firstName" required>
                    Voornaam
                </FieldLabel>

                <FieldDescription>
                    Vul je voornaam in zoals deze officieel geregistreerd staat.
                </FieldDescription>

                <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Voornaam"
                    required
                />
            </Field>

            <Field className="flex-col">
                <FieldLabel htmlFor="lastName" required>
                    Achternaam
                </FieldLabel>

                <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Achternaam"
                    required
                />
            </Field>

            <Field className="flex-col gap-0">
                <div className="flex flex-col gap-1">
                    <FieldLabel htmlFor="email" required>
                        E-mailadres
                    </FieldLabel>

                    <FieldDescription>
                        We gebruiken je e-mailadres om contact met je op te
                        nemen.
                    </FieldDescription>

                    <Input
                        id="email"
                        name="email"
                        type="email"
                        defaultValue="ongeldig-mailadres"
                        aria-invalid
                        aria-describedby="email-error"
                    />
                </div>

                <FieldError id="email-error">
                    Vul een geldig e-mailadres in.
                </FieldError>
            </Field>

            <Field className="flex-col">
                <FieldLabel htmlFor="phone">Telefoonnummer</FieldLabel>

                <FieldDescription>Optioneel.</FieldDescription>

                <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="06 12345678"
                />
            </Field>

            <Field className="flex-col">
                <FieldLabel htmlFor="password" required>
                    Wachtwoord
                </FieldLabel>

                <FieldDescription>
                    Gebruik minimaal acht tekens.
                </FieldDescription>

                <PasswordInput
                    id="password"
                    name="password"
                    placeholder="Voer een wachtwoord in"
                    autoComplete="new-password"
                    required
                />
            </Field>

            <Field className="flex-col">
                <FieldLabel htmlFor="amount">Aantal</FieldLabel>

                <FieldDescription>
                    Kies een waarde tussen 0 en 100.
                </FieldDescription>

                <NumberInput
                    id="amount"
                    name="amount"
                    minValue={0}
                    maxValue={100}
                    step={1}
                />
            </Field>

            <Field className="flex-col">
                <FieldLabel htmlFor="search">Zoeken</FieldLabel>

                <InputGroup>
                    <InputGroupInput
                        id="search"
                        name="search"
                        placeholder="Zoeken..."
                    />

                    <InputGroupAddon align="inline-end">
                        <InputGroupButton
                            variant="secondary"
                            aria-label="Zoeken">
                            <MagnifyingGlass />
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </Field>

            <Field className="flex-col">
                <FieldLabel htmlFor="description">Toelichting</FieldLabel>

                <FieldDescription>
                    Voeg eventueel aanvullende informatie toe.
                </FieldDescription>

                <Textarea
                    id="description"
                    name="description"
                    placeholder="Schrijf hier je toelichting..."
                />
            </Field>

            <div className="flex justify-end gap-2">
                <Button type="button" variant="secondary">
                    Annuleren
                </Button>

                <Button type="submit">Opslaan</Button>
            </div>
        </form>
    ),
}
