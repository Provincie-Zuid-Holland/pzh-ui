import type { ColumnDef } from '@tanstack/react-table'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { DataTable } from './DataTable'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './Table'

const data = [{ name: 'Zuid' }, { name: 'Noord' }, { name: 'West' }]
const columns: ColumnDef<(typeof data)[number]>[] = [
    { accessorKey: 'name', header: 'Naam' },
]
describe('Table', () => {
    it('preserves native semantics, caption and refs', () => {
        const ref = { current: null as HTMLTableElement | null }
        render(
            <Table ref={ref}>
                <TableCaption>Provincies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead scope="col">Naam</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Zuid-Holland</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        )
        expect(screen.getByRole('table', { name: 'Provincies' })).toBe(
            ref.current
        )
        expect(screen.getByRole('columnheader')).toHaveAttribute('scope', 'col')
    })
    it('sorts through a keyboard accessible header', async () => {
        const user = userEvent.setup()
        render(<DataTable data={data} columns={columns} caption="Provincies" />)
        screen.getByRole('button', { name: 'Naam' }).focus()
        await user.keyboard('{Enter}')
        expect(screen.getByRole('columnheader')).toHaveAttribute(
            'aria-sort',
            'ascending'
        )
        expect(
            screen.getAllByRole('cell').map(cell => cell.textContent)
        ).toEqual(['Noord', 'West', 'Zuid'])
        await user.keyboard(' ')
        expect(screen.getByRole('columnheader')).toHaveAttribute(
            'aria-sort',
            'descending'
        )
    })
    it('paginates and marks the current page', async () => {
        const user = userEvent.setup()
        render(
            <DataTable
                data={data}
                columns={columns}
                caption="Provincies"
                initialState={{ pagination: { pageSize: 2, pageIndex: 0 } }}
            />
        )
        expect(screen.queryByText('West')).not.toBeInTheDocument()
        await user.click(
            screen.getByRole('button', { name: 'Ga naar de volgende pagina' })
        )
        expect(screen.getByText('West')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Pagina 2' })
        ).toHaveAttribute('aria-current', 'page')
        expect(
            screen.getByRole('button', { name: 'Ga naar de volgende pagina' })
        ).toBeDisabled()
    })
    it('shows endpoints and ellipses around the current page for large datasets', async () => {
        const user = userEvent.setup()
        const manyRows = Array.from({ length: 20 }, (_, index) => ({
            name: `Row ${index + 1}`,
        }))
        const { container } = render(
            <DataTable
                data={manyRows}
                columns={columns}
                caption="Provincies"
                initialState={{ pagination: { pageSize: 1, pageIndex: 9 } }}
            />
        )
        expect(
            container.querySelectorAll('[data-slot="pagination-ellipsis"]')
        ).toHaveLength(2)
        expect(
            screen.getByRole('button', { name: 'Pagina 1' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Pagina 20' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Pagina 10' })
        ).toHaveAttribute('aria-current', 'page')
        expect(
            screen.queryByRole('button', { name: 'Pagina 5' })
        ).not.toBeInTheDocument()
        await user.click(screen.getByRole('button', { name: 'Pagina 20' }))
        expect(screen.getByText('Row 20')).toBeInTheDocument()
        expect(
            container.querySelectorAll('[data-slot="pagination-ellipsis"]')
        ).toHaveLength(1)
        await user.click(screen.getByRole('button', { name: 'Pagina 1' }))
        expect(screen.getByText('Row 1')).toBeInTheDocument()
        expect(
            container.querySelectorAll('[data-slot="pagination-ellipsis"]')
        ).toHaveLength(1)
    })
    it('shows every page without ellipses for small datasets', () => {
        const { container } = render(
            <DataTable
                data={data}
                columns={columns}
                caption="Provincies"
                initialState={{ pagination: { pageSize: 1, pageIndex: 0 } }}
            />
        )
        expect(
            container.querySelector('[data-slot="pagination-ellipsis"]')
        ).not.toBeInTheDocument()
        for (const page of [1, 2, 3])
            expect(
                screen.getByRole('button', { name: `Pagina ${page}` })
            ).toBeInTheDocument()
    })
    it('filters before pagination', () => {
        render(
            <DataTable
                data={data}
                columns={columns}
                caption="Provincies"
                state={{ globalFilter: 'Noord' }}
            />
        )
        expect(screen.getAllByRole('cell')).toHaveLength(1)
        expect(screen.getByText('Noord')).toBeInTheDocument()
    })
    it('renders valid empty and loading rows', () => {
        const { rerender } = render(
            <DataTable data={[]} columns={columns} caption="Provincies" />
        )
        expect(
            within(screen.getByRole('cell')).getByRole('status')
        ).toHaveTextContent('Geen resultaten')
        rerender(
            <DataTable
                data={data}
                columns={columns}
                caption="Provincies"
                isLoading
            />
        )
        expect(screen.getByRole('table')).toHaveAttribute('aria-busy', 'true')
        expect(screen.getByRole('status')).toHaveTextContent('Gegevens laden')
        expect(screen.queryByText('Zuid')).not.toBeInTheDocument()
    })
})
