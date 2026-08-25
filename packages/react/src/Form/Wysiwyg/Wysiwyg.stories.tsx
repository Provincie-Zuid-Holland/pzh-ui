import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field, FieldDescription, FieldError, FieldLabel } from '../Field'
import { Wysiwyg } from './Wysiwyg'

const initialContent = `De kern van het erfgoedbeleid van <strong>Zuid-Holland</strong> is het behoud van erfgoed door het beschermen, beleven en benutten van erfgoed.\nDeze  beleidskeuze is gesplitst in twee hoofdthema’s:\nA.\tBeschermen van erfgoed\nB.\tBeleven en benutten van erfgoed (apart beschreven)\nHoofdthema A. bestaat uit  vier onderdelen:\n1.\tBehouden en versterken werelderfgoed \n2.\tBehouden en verbeteren kroonjuwelen cultureel erfgoed \n3.\tGaranderen van windvang en zicht op historische windmolens \n4.\tInstandhouden en verbeteren van de omgeving van landgoederen en kastelen\n\nAd 1. De provincie wil de unieke en universele waarden van werelderfgoed in Zuid-Holland behouden,  versterken en beleefbaar maken. De provincie regelt dit door via de Omgevingsverordening Zuid-Holland begrenzing en kernkwaliteiten van werelderfgoed uit te werken, alsmede regels te stellen aan bestemmingsplannen gericht op instandhouding en versterking van de kernkwaliteiten.\n\nAd 2. De provincie wil de waarden van de kroonjuwelen cultureel erfgoed in Zuid-Holland behouden en/of verbeteren en versterken. De provincie regelt dit door kroonjuwelen aan te wijzen, via de Omgevingsverordening Zuid-Holland, als beschermingscategorie voor ruimtelijke kwaliteit.\n\nAd 3. De provincie wil voldoende vrije windvang van en het zicht op historische windmolens in Zuid-Holland. De provincie regelt dit door kaders te stellen in de Omgevingsverordening Zuid-Holland en de provincie te vertegenwoordigen ten behoeve van het garanderen van vrije windvang van en het zicht op historische windmolens in Zuid-Holland (molenbiotoop).\n\nAd 4. De provincie wil de waarden van de landgoed- en kasteelbiotopen in Zuid-Holland instandhouden en/of verbeteren. De provincie regelt dit door kaders te stellen via de Omgevingsverordening Zuid-Holland ten behoeve van cultureel erfgoed, zijnde landgoed- en kasteelbiotopen.`

const meta = {
    title: 'Componenten/Form/Wysiwyg',
    component: Wysiwyg,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        Story => (
            <div className="w-[min(800px,calc(100vw-2rem))]">
                <Story />
            </div>
        ),
    ],
    args: {
        placeholder: 'Begin met typen...',
    },
} satisfies Meta<typeof Wysiwyg>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => (
        <Field className="flex-col">
            <FieldLabel required>Beschrijving</FieldLabel>

            <FieldDescription>
                Geef een beschrijving van het beleid.
            </FieldDescription>

            <Wysiwyg {...args} />
        </Field>
    ),
}

export const WithContent: Story = {
    args: {
        value: initialContent,
    },
    render: args => (
        <Field className="flex-col">
            <FieldLabel>Beschrijving</FieldLabel>

            <Wysiwyg {...args} />
        </Field>
    ),
}

export const Disabled: Story = {
    args: {
        disabled: true,
        value: `<p>Deze editor is uitgeschakeld en kan niet worden aangepast.</p>`,
    },
    render: args => (
        <Field className="flex-col">
            <FieldLabel>Beschrijving</FieldLabel>

            <Wysiwyg {...args} />
        </Field>
    ),
}

export const Invalid: Story = {
    args: {
        invalid: true,
        value: '<p>Deze inhoud bevat een fout.</p>',
    },
    render: args => (
        <Field className="flex-col">
            <FieldLabel required>Beschrijving</FieldLabel>

            <Wysiwyg {...args} />

            <FieldError>Vul een geldige beschrijving in.</FieldError>
        </Field>
    ),
}

export const AllMenuOptions: Story = {
    args: {
        toolbar: [
            'heading',
            'bold',
            'italic',
            'underline',
            'strike',
            'alignLeft',
            'alignCenter',
            'alignRight',
            'alignJustify',
            'table',
            'bulletList',
            'orderedList',
            'subscript',
            'superscript',
            'link',
            'image',
        ],
    },
    render: args => (
        <Field className="flex-col">
            <FieldLabel required>Beschrijving</FieldLabel>

            <Wysiwyg {...args} />
        </Field>
    ),
}
