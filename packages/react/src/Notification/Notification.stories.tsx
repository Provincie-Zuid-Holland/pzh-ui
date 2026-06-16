import { Meta, StoryObj } from '@storybook/react-vite'

import { Notification, NotificationProps } from './Notification'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Componenten/Notification',
    component: Notification,
} satisfies Meta<typeof Notification>

type Story = StoryObj<typeof Notification>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: NotificationProps) => <Notification {...args} />

export const Info = {
    render: Template,
    args: {
        title: 'Titel van melding',
        children: (
            <>
                <ul>
                    <li>
                        Schrijf actief, dus hoe je de maatregel uitvoert. Niet
                        hoe je de maatregel zou kunnen uitvoeren.
                    </li>
                    <li>
                        Schrijf vanuit ‘de provincie’, gebruik dus géén we/wij.
                        Spreek verder over de provincie in ze/zij of haar.
                    </li>
                    <li>
                        Schrijf zo veel mogelijk tijdloos. Gebruik dus zo min
                        mogelijk jaartallen zodat het beleid niet, om deze
                        reden, hoeft te worden herzien. Lange termijn
                        doelstellingen kunnen wel, maar voorkom herhaling van
                        het beleidsdoel.
                    </li>
                    <li>
                        Klik op het ‘i’ icoon voor toelichting over het invullen
                        van het veld.
                    </li>
                </ul>
                <i>
                    Let op! Het monitoren en evalueren van beleid is geen
                    maatregel. Monitoren en evalueren van een
                    maatregel/programmatische aanpak gebeurt in de
                    beleidscyclus. Deze handeling heeft geen (directe) externe
                    werking. De LTA biedt ruimte om trajecten weer te geven
                    waarin beleidsmatige sturing wordt uitgewerkt of onderzocht.
                </i>
            </>
        ),
        variant: 'info',
    },
} satisfies Story

export const Warning = {
    render: Template,
    args: {
        title: 'Titel van de melding',
        children: 'Dit is een toelichting.',
        variant: 'warning',
        onClose: () => {},
    },
} satisfies Story

export const Positive = {
    render: Template,
    args: {
        title: 'Titel van de melding',
        children: 'Dit is een melding.',
        variant: 'positive',
    },
} satisfies Story

export const Negative = {
    render: Template,
    args: {
        title: 'Titel van de melding',
        children: 'Dit is een melding.',
        variant: 'negative',
    },
} satisfies Story
