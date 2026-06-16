import { Meta, StoryObj } from '@storybook/react-vite'

import { MagnifyingGlass } from '../../../../icons'
import { FieldInput, FieldInputProps } from './FieldInput'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Form/FieldInput',
    component: FieldInput,
} satisfies Meta<typeof FieldInput>

type Story = StoryObj<typeof FieldInput>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: FieldInputProps) => <FieldInput {...args} />

export const Default = {
    render: Template,
    args: {
        placeholder: 'Tekstvlak',
    },
} satisfies Story

export const DisabledEmpty = {
    render: Template,
    args: {
        placeholder: 'Tekstvlak',
        disabled: true,
    },
} satisfies Story

export const DisabledFilled = {
    render: Template,
    args: {
        placeholder: 'Tekstvlak',
        disabled: true,
        value: 'Waarde',
    },
} satisfies Story

export const WithLabel = {
    render: Template,
    args: {
        placeholder: 'Tekstvlak',
        label: 'Form label',
        description: 'Korte omschrijving voor onder het label',
        notification: {
            title: 'Overzicht beleidsinstrumenten',
            children: (
                <>
                    <ul>
                        <li>
                            Schrijf actief, dus hoe je de maatregel uitvoert.
                            Niet hoe je de maatregel zou kunnen uitvoeren.
                        </li>
                        <li>
                            Schrijf vanuit ‘de provincie’, gebruik dus géén
                            we/wij. Spreek verder over de provincie in ze/zij of
                            haar.
                        </li>
                        <li>
                            Schrijf zo veel mogelijk tijdloos. Gebruik dus zo
                            min mogelijk jaartallen zodat het beleid niet, om
                            deze reden, hoeft te worden herzien. Lange termijn
                            doelstellingen kunnen wel, maar voorkom herhaling
                            van het beleidsdoel.
                        </li>
                        <li>
                            Klik op het ‘i’ icoon voor toelichting over het
                            invullen van het veld.
                        </li>
                    </ul>
                    <i>
                        Let op! Het monitoren en evalueren van beleid is geen
                        maatregel. Monitoren en evalueren van een
                        maatregel/programmatische aanpak gebeurt in de
                        beleidscyclus. Deze handeling heeft geen (directe)
                        externe werking. De LTA biedt ruimte om trajecten weer
                        te geven waarin beleidsmatige sturing wordt uitgewerkt
                        of onderzocht.
                    </i>
                </>
            ),
        },
        required: true,
    },
} satisfies Story

export const LayoutGrid = {
    render: Template,
    args: {
        placeholder: 'Tekstvlak',
        label: 'Form label',
        description: 'Korte omschrijving voor onder het label',
        required: true,
        layout: 'grid',
    },
} satisfies Story

export const WithError = {
    render: Template,
    args: {
        placeholder: 'Tekstvlak',
        label: 'Form label',
        hasError: true,
        required: true,
        value: 'Waarde',
    },
} satisfies Story

export const WithIcon = {
    render: Template,
    args: {
        placeholder: 'Zoek naar indicator',
        icon: MagnifyingGlass as any,
    },
} satisfies Story
