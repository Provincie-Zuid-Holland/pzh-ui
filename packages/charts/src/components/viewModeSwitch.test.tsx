// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { defaultChartLabels } from '../defaultLabels'
import { ViewModeSwitch } from './viewModeSwitch'

describe('ViewModeSwitch', () => {
    it('is a radio group named by the visible label, one option per view', () => {
        render(
            <ViewModeSwitch
                value="visual"
                labels={defaultChartLabels}
                onChange={() => {}}
            />
        )
        const group = screen.getByRole('radiogroup', { name: 'Weergave' })
        const radios = screen.getAllByRole('radio')
        expect(
            radios.map(
                radio => radio.getAttribute('aria-label') ?? radio.textContent
            )
        ).toEqual(['Visueel', 'Tabel', 'Samengevat'])
        expect(group).toContainElement(radios[0])
        expect(screen.getByRole('radio', { name: 'Visueel' })).toHaveAttribute(
            'aria-checked',
            'true'
        )
        expect(screen.getByRole('radio', { name: 'Tabel' })).toHaveAttribute(
            'aria-checked',
            'false'
        )
    })

    it('is a single tab stop: only the checked option is tabbable', () => {
        render(
            <ViewModeSwitch
                value="textual"
                labels={defaultChartLabels}
                onChange={() => {}}
            />
        )
        expect(screen.getByRole('radio', { name: 'Tabel' })).toHaveAttribute(
            'tabindex',
            '0'
        )
        expect(screen.getByRole('radio', { name: 'Visueel' })).toHaveAttribute(
            'tabindex',
            '-1'
        )
        expect(
            screen.getByRole('radio', { name: 'Samengevat' })
        ).toHaveAttribute('tabindex', '-1')
    })

    it('changes on click', async () => {
        const onChange = vi.fn()
        render(
            <ViewModeSwitch
                value="visual"
                labels={defaultChartLabels}
                onChange={onChange}
            />
        )
        await userEvent.click(screen.getByRole('radio', { name: 'Samengevat' }))
        expect(onChange).toHaveBeenCalledWith('summary')
    })

    it('moves with the arrow keys, wrapping, and jumps with Home and End', async () => {
        const onChange = vi.fn()
        const user = userEvent.setup()
        render(
            <ViewModeSwitch
                value="visual"
                labels={defaultChartLabels}
                onChange={onChange}
            />
        )
        screen.getByRole('radio', { name: 'Visueel' }).focus()
        await user.keyboard('{ArrowRight}')
        expect(onChange).toHaveBeenLastCalledWith('textual')
        await user.keyboard('{ArrowLeft}')
        // Selection is controlled by the parent, so from the still-current
        // 'visual' a left arrow wraps to the end.
        expect(onChange).toHaveBeenLastCalledWith('summary')
        await user.keyboard('{End}')
        expect(onChange).toHaveBeenLastCalledWith('summary')
        await user.keyboard('{Home}')
        expect(onChange).toHaveBeenLastCalledWith('visual')
    })

    it('keeps its icons out of the accessibility tree', () => {
        const { container } = render(
            <ViewModeSwitch
                value="visual"
                labels={defaultChartLabels}
                onChange={() => {}}
            />
        )
        for (const svg of container.querySelectorAll('svg')) {
            expect(svg).toHaveAttribute('aria-hidden', 'true')
        }
    })
})
