import { MagnifyingGlass } from '@pzh-ui/icons'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { ButtonGroup } from '../ButtonGroup'
import { Checkbox } from './Checkbox'
import { DatePicker } from './DatePicker'
import { Field, FieldDescription, FieldError, FieldLabel } from './Field'
import { Input } from './Input'
import { NumberInput } from './NumberInput'
import { PasswordInput } from './PasswordInput'
import { RadioGroup, RadioGroupItem } from './RadioGroup'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './Select'
import { Textarea } from './Textarea'
import { Wysiwyg } from './Wysiwyg'

const meta = {
    title: 'Componenten/Form',
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta

export default meta

type Story = StoryObj

const provinces = [
    ['zuid-holland', 'Zuid-Holland'],
    ['noord-holland', 'Noord-Holland'],
    ['utrecht', 'Utrecht'],
    ['zeeland', 'Zeeland'],
] as const

function FormSection({
    children,
    description,
    title,
}: {
    children: React.ReactNode
    description: string
    title: string
}) {
    return (
        <section
            className="rounded-lg p-5 shadow-sm sm:p-8 border border-border bg-background"
            style={{ marginTop: 40 }}>
            <div className="mb-4 pb-5 border-spacing-2 border-b border-border">
                <h2 className="text-l font-bold text-foreground">{title}</h2>
                <p className="mt-1 text-s text-text-muted">{description}</p>
            </div>
            {children}
        </section>
    )
}

export const Default: Story = {
    render: () => (
        <div className="px-6 py-8 sm:px-10 lg:px-16 min-h-screen bg-surface-subtle">
            <form
                className="max-w-5xl mx-auto flex w-full flex-col"
                onSubmit={event => event.preventDefault()}>
                <header className="max-w-2xl">
                    <h1 className="text-xl font-bold text-foreground">
                        Aanvraag indienen
                    </h1>
                    <p className="mt-2 leading-relaxed text-text-subtle">
                        Vul de onderstaande gegevens in. Velden met een
                        sterretje zijn verplicht.
                    </p>
                </header>

                <FormSection
                    title="Persoonlijke gegevens"
                    description="Vertel ons wie je bent en hoe we contact met je kunnen opnemen.">
                    <div className="gap-4 md:grid-cols-2 grid">
                        <Field>
                            <FieldLabel htmlFor="first-name" required>
                                Voornaam
                            </FieldLabel>
                            <Input
                                id="first-name"
                                name="firstName"
                                placeholder="Voornaam"
                                required
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="last-name" required>
                                Achternaam
                            </FieldLabel>
                            <Input
                                id="last-name"
                                name="lastName"
                                placeholder="Achternaam"
                                required
                            />
                        </Field>

                        <Field className="gap-0">
                            <div className="gap-1 flex flex-col">
                                <FieldLabel htmlFor="email" required>
                                    E-mailadres
                                </FieldLabel>
                                <FieldDescription>
                                    Hier sturen we de bevestiging naartoe.
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

                        <Field>
                            <FieldLabel htmlFor="phone">
                                Telefoonnummer
                            </FieldLabel>
                            <FieldDescription>Optioneel.</FieldDescription>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="06 12345678"
                            />
                        </Field>

                        <Field>
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
                                showStrength
                                required
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="birth-date">
                                Geboortedatum
                            </FieldLabel>
                            <FieldDescription>
                                Gebruik het formaat dd-mm-jjjj.
                            </FieldDescription>
                            <DatePicker id="birth-date" name="birthDate" />
                        </Field>
                    </div>
                </FormSection>

                <FormSection
                    title="Gegevens van de aanvraag"
                    description="Beschrijf waar de aanvraag over gaat en voor welke locatie deze geldt.">
                    <div className="gap-4 md:grid-cols-2 grid">
                        <Field>
                            <FieldLabel required>Provincie</FieldLabel>
                            <FieldDescription>
                                Selecteer de provincie van de hoofdlocatie.
                            </FieldDescription>
                            <Select
                                name="province"
                                placeholder="Selecteer een provincie">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {provinces.map(([id, name]) => (
                                        <SelectItem key={id} id={id}>
                                            {name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field>
                            <FieldLabel>Aantal betrokken locaties</FieldLabel>
                            <FieldDescription>
                                Kies een waarde tussen 1 en 25.
                            </FieldDescription>
                            <NumberInput
                                name="locationCount"
                                defaultValue={1}
                                minValue={1}
                                maxValue={25}
                            />
                        </Field>

                        <div
                            className="gap-4 pt-7 grid border-t border-border"
                            style={{ gridColumn: '1 / -1' }}>
                            <Field>
                                <FieldLabel htmlFor="location-search">
                                    Locatie zoeken
                                </FieldLabel>
                                <FieldDescription>
                                    Zoek de hoofdlocatie op adres of postcode.
                                </FieldDescription>
                                <ButtonGroup className="w-full">
                                    <Input placeholder="Zoek op adres of postcode" />
                                    <Button
                                        variant="secondary"
                                        aria-label="Locatie zoeken">
                                        <MagnifyingGlass />
                                    </Button>
                                </ButtonGroup>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="summary" required>
                                    Korte toelichting
                                </FieldLabel>
                                <FieldDescription>
                                    Vat de aanvraag samen in maximaal 500
                                    tekens.
                                </FieldDescription>
                                <Textarea
                                    id="summary"
                                    name="summary"
                                    placeholder="Geef een korte toelichting..."
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel required>
                                    Uitgebreide beschrijving
                                </FieldLabel>
                                <FieldDescription>
                                    Voeg alle informatie toe die nodig is om de
                                    aanvraag te beoordelen.
                                </FieldDescription>
                                <Wysiwyg placeholder="Begin met typen..." />
                            </Field>
                        </div>
                    </div>
                </FormSection>

                <FormSection
                    title="Voorkeuren en toestemming"
                    description="Kies hoe we je mogen benaderen en bevestig de voorwaarden.">
                    <div className="gap-4 flex flex-col">
                        <Field>
                            <FieldLabel id="contact-preference-label" required>
                                Voorkeurskanaal
                            </FieldLabel>
                            <FieldDescription>
                                Kies één manier waarop we contact mogen opnemen.
                            </FieldDescription>
                            <RadioGroup
                                aria-labelledby="contact-preference-label"
                                name="contactPreference"
                                defaultValue="email"
                                className="gap-4 sm:grid-cols-3 flex">
                                <RadioGroupItem value="email">
                                    E-mail
                                </RadioGroupItem>
                                <RadioGroupItem value="phone">
                                    Telefoon
                                </RadioGroupItem>
                                <RadioGroupItem value="post">
                                    Post
                                </RadioGroupItem>
                            </RadioGroup>
                        </Field>

                        <Field className="pt-7 border-t border-border">
                            <FieldLabel>Toestemming</FieldLabel>
                            <FieldDescription>
                                Je kunt deze voorkeuren later altijd wijzigen.
                            </FieldDescription>
                            <div className="gap-2 pt-1 flex flex-col">
                                <Checkbox name="newsletter" className="w-full">
                                    Houd mij op de hoogte van mijn aanvraag
                                </Checkbox>
                                <Checkbox
                                    name="terms"
                                    isRequired
                                    className="w-full">
                                    Ik ga akkoord met de voorwaarden
                                </Checkbox>
                            </div>
                        </Field>
                    </div>
                </FormSection>

                <div
                    className="gap-3 sm:flex-row sm:justify-end flex flex-col-reverse"
                    style={{ marginTop: 40 }}>
                    <Button type="button" variant="secondary">
                        Annuleren
                    </Button>
                    <Button type="submit">Aanvraag indienen</Button>
                </div>
            </form>
        </div>
    ),
}
