import { Meta, StoryObj } from '@storybook/react'

import { FieldRte, FieldRteProps } from './FieldRte'

const initialContent = `De kern van het erfgoedbeleid van Zuid-Holland is het behoud van erfgoed door het beschermen, beleven en benutten van erfgoed.\nDeze  beleidskeuze is gesplitst in twee hoofdthema’s:\nA.\tBeschermen van erfgoed\nB.\tBeleven en benutten van erfgoed (apart beschreven)\nHoofdthema A. bestaat uit  vier onderdelen:\n1.\tBehouden en versterken werelderfgoed \n2.\tBehouden en verbeteren kroonjuwelen cultureel erfgoed \n3.\tGaranderen van windvang en zicht op historische windmolens \n4.\tInstandhouden en verbeteren van de omgeving van landgoederen en kastelen\n\nAd 1. De provincie wil de unieke en universele waarden van werelderfgoed in Zuid-Holland behouden,  versterken en beleefbaar maken. De provincie regelt dit door via de Omgevingsverordening Zuid-Holland begrenzing en kernkwaliteiten van werelderfgoed uit te werken, alsmede regels te stellen aan bestemmingsplannen gericht op instandhouding en versterking van de kernkwaliteiten.\n\nAd 2. De provincie wil de waarden van de kroonjuwelen cultureel erfgoed in Zuid-Holland behouden en/of verbeteren en versterken. De provincie regelt dit door kroonjuwelen aan te wijzen, via de Omgevingsverordening Zuid-Holland, als beschermingscategorie voor ruimtelijke kwaliteit.\n\nAd 3. De provincie wil voldoende vrije windvang van en het zicht op historische windmolens in Zuid-Holland. De provincie regelt dit door kaders te stellen in de Omgevingsverordening Zuid-Holland en de provincie te vertegenwoordigen ten behoeve van het garanderen van vrije windvang van en het zicht op historische windmolens in Zuid-Holland (molenbiotoop).\n\nAd 4. De provincie wil de waarden van de landgoed- en kasteelbiotopen in Zuid-Holland instandhouden en/of verbeteren. De provincie regelt dit door kaders te stellen via de Omgevingsverordening Zuid-Holland ten behoeve van cultureel erfgoed, zijnde landgoed- en kasteelbiotopen.`

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldRte',
    component: FieldRte,
} satisfies Meta<typeof FieldRte>

type Story = StoryObj<typeof FieldRte>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldRteProps) => <FieldRte {...args} />

export const Default = {
    render: Template,
    args: {
        name: 'field-rte',
        onBlur: console.log,
        initialContent,
        placeholder: 'Start met typen...',
        customMenuOptions: ['image', 'link'],
    },
} satisfies Story

export const Disabled = {
    render: Template,
    args: {
        name: 'field-rte',
        disabled: true,
        initialContent,
    },
} satisfies Story

export const WithLabel = {
    render: Template,
    args: {
        name: 'field-rte',
        label: 'WYSIWYG',
        description: 'What you see is what you get',
        initialContent,
    },
} satisfies Story

export const LayoutGrid = {
    render: Template,
    args: {
        name: 'field-rte',
        label: 'WYSIWYG',
        description: 'What you see is what you get',
        layout: 'grid',
        initialContent,
    },
} satisfies Story

export const WithError = {
    render: Template,
    args: {
        name: 'field-rte',
        label: 'WYSIWYG',
        description: 'What you see is what you get',
        initialContent,
        hasError: true,
    },
} satisfies Story
