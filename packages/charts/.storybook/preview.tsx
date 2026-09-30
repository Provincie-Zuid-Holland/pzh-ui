// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import type { Preview } from '@storybook/react-vite'

/**
 * Deliberately no stylesheet import. The library injects its own through React 19
 * `<style href precedence>` hoisting in chartCard.tsx, deduped across cards and
 * across the docs iframe. A story rendering unstyled is a real regression for
 * consumers, not a Storybook configuration gap to paper over.
 *
 * The --pzh-* custom properties are inline styles on each card root (tokens.ts
 * getCssVars), so there is no :root theme layer either. The library has no dark
 * theme — --pzh-bg is #FFFFFF in both token sets — so no colour-scheme toolbar:
 * it would advertise support that does not exist. The one variable axis is
 * `initialHighContrast`, which is a prop and therefore a control.
 */
const preview: Preview = {
    parameters: {
        layout: 'padded',
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: { test: 'error' },
        options: {
            storySort: {
                order: ['Introduction', 'Charts', 'Overview'],
            },
        },
    },

    decorators: [
        // Charts size themselves from their container (useContainerSize, 640px
        // fallback) and `height` is a minimum, so a fixed box keeps stories stable.
        Story => (
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    maxWidth: 760,
                    minHeight: 360,
                }}>
                <Story />
            </div>
        ),
    ],

    tags: ['autodocs'],
}

export default preview
