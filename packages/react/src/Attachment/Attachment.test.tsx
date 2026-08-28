import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import {
    Attachment,
    AttachmentAction,
    AttachmentActions,
    AttachmentContent,
    AttachmentDescription,
    AttachmentGroup,
    AttachmentMedia,
    AttachmentProgress,
    AttachmentTitle,
} from './Attachment'

describe('Attachment', () => {
    it('renders the attachment and forwards its state', () => {
        render(
            <Attachment state="uploading">
                <AttachmentMedia />
                <AttachmentContent>
                    <AttachmentTitle>document.pdf</AttachmentTitle>
                    <AttachmentDescription>75 KB</AttachmentDescription>
                </AttachmentContent>
            </Attachment>
        )

        expect(screen.getByTestId('attachment')).toHaveAttribute(
            'data-state',
            'uploading'
        )
        expect(screen.getByTestId('attachment')).toHaveAttribute(
            'data-orientation',
            'horizontal'
        )
        expect(screen.getByText('document.pdf')).toBeVisible()
        expect(screen.getByText('75 KB')).toBeVisible()
    })

    it('provides a default state-aware file icon', () => {
        render(
            <Attachment state="done">
                <AttachmentMedia />
            </Attachment>
        )

        expect(screen.getByTestId('attachment-file-icon')).toBeInTheDocument()
        expect(screen.getByTestId('attachment-success-icon')).toHaveClass(
            'group-data-[state=done]/attachment:block'
        )
        expect(screen.getByTestId('attachment-error-icon')).toHaveClass(
            'group-data-[state=error]/attachment:block'
        )
    })

    it('renders an accessible upload progress bar', () => {
        render(<AttachmentProgress aria-label="Uploadvoortgang" value={75} />)

        const progress = screen.getByRole('progressbar', {
            name: 'Uploadvoortgang',
        })

        expect(progress).toHaveAttribute('aria-valuemin', '0')
        expect(progress).toHaveAttribute('aria-valuemax', '100')
        expect(progress).toHaveAttribute('aria-valuenow', '75')
        expect(screen.getByText('75%')).toBeVisible()
        expect(screen.getByTestId('attachment-progress-indicator')).toHaveStyle(
            { width: '75%' }
        )
    })

    it('clamps progress values between zero and one hundred', () => {
        render(<AttachmentProgress value={140} />)

        expect(screen.getByRole('progressbar')).toHaveAttribute(
            'aria-valuenow',
            '100'
        )
        expect(screen.getByTestId('attachment-progress-indicator')).toHaveStyle(
            { width: '100%' }
        )
    })

    it('calls the attachment action when pressed', () => {
        const onPress = vi.fn()

        render(
            <Attachment>
                <AttachmentActions>
                    <AttachmentAction
                        aria-label="Bijlage verwijderen"
                        onPress={onPress}
                    />
                </AttachmentActions>
            </Attachment>
        )

        fireEvent.click(
            screen.getByRole('button', { name: 'Bijlage verwijderen' })
        )

        expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('stacks attachment groups vertically', () => {
        render(
            <AttachmentGroup>
                <Attachment />
                <Attachment />
            </AttachmentGroup>
        )

        expect(screen.getByTestId('attachment-group')).toHaveClass(
            'flex-col',
            'gap-8'
        )
        expect(screen.getAllByTestId('attachment')).toHaveLength(2)
    })
})
