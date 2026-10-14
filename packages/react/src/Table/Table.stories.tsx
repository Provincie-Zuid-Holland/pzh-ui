import { useMemo, useState } from 'react'

import { User } from '@pzh-ui/icons'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ColumnDef } from '@tanstack/react-table'

import { Badge } from '../Badge'
import { Button } from '../Button'
import { Input } from '../Form/Input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../Form/Select'
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

const meta = {
    title: 'Componenten/Table',
    component: Table,
    parameters: { layout: 'padded' },
} satisfies Meta<typeof Table>
export default meta
type Story = StoryObj<typeof meta>
type User = {
    id: string
    name: string
    role: string
    email: string
    active: boolean
}
const users: User[] = [
    {
        id: '1',
        name: 'Gebruiker',
        role: 'Behandelaar',
        email: 'testba@pzh.nl',
        active: false,
    },
    {
        id: '2',
        name: 'Gert Bobertus',
        role: 'Beheerder',
        email: 'g.bobertus@pzh.nl',
        active: true,
    },
    {
        id: '3',
        name: 'Test_BA',
        role: 'Behandelaar',
        email: 'testba@pzh.nl',
        active: true,
    },
    {
        id: '4',
        name: 'Test_Admin',
        role: 'Beheerder',
        email: 'testadmin@pzh.nl',
        active: true,
    },
    ...Array.from({ length: 8 }, (_, index) => ({
        id: String(index + 5),
        name: `Gebruiker ${index + 5}`,
        role: index % 2 ? 'Beheerder' : 'Behandelaar',
        email: `gebruiker${index + 5}@pzh.nl`,
        active: true,
    })),
]
const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: 'Naam',
        cell: ({ getValue }) => (
            <span className="font-bold gap-2 flex items-center">
                <User className="text-info-border" />
                {getValue<string>()}
            </span>
        ),
    },
    { accessorKey: 'role', header: 'Rol' },
    { accessorKey: 'email', header: 'E-mailadres' },
    {
        accessorKey: 'active',
        header: 'Status',
        cell: ({ getValue }) => (
            <Badge
                variant={getValue<boolean>() ? 'success' : 'neutral'}
                appearance="outline"
                uppercase={false}>
                {getValue<boolean>() ? 'Actief' : 'Inactief'}
            </Badge>
        ),
    },
]
export const Default: Story = {
    render: args => (
        <Table {...args}>
            <TableCaption>Gebruikersoverzicht</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead scope="col">Naam</TableHead>
                    <TableHead scope="col">Rol</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.slice(0, 4).map(user => (
                    <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.role}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ),
}
function UsersExample() {
    const [query, setQuery] = useState('')
    const [role, setRole] = useState('')
    const [filters, setFilters] = useState({ query: '', role: '' })
    const data = useMemo(
        () =>
            users.filter(
                user =>
                    (!filters.role || user.role === filters.role) &&
                    `${user.name} ${user.email}`
                        .toLowerCase()
                        .includes(filters.query.toLowerCase())
            ),
        [filters]
    )
    return (
        <>
            <form
                onSubmit={event => {
                    event.preventDefault()
                    setFilters({ query, role })
                }}
                className="gap-2 mb-4 flex flex-wrap items-center">
                <Input
                    aria-label="Zoek op naam of e-mailadres"
                    placeholder="Zoek op naam of e-mailadres"
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    className="min-w-48 flex-1"
                />
                <Select
                    aria-label="Rol"
                    placeholder="Selecteer een rol"
                    selectedKey={role || null}
                    onSelectionChange={key => setRole(String(key ?? ''))}
                    className="min-w-48 flex-1">
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem id="">Alle rollen</SelectItem>
                        <SelectItem id="Behandelaar">Behandelaar</SelectItem>
                        <SelectItem id="Beheerder">Beheerder</SelectItem>
                    </SelectContent>
                </Select>
                <Button type="submit" variant="secondary">
                    Zoeken
                </Button>
            </form>
            <DataTable
                data={data}
                columns={columns}
                caption="Gebruikers"
                getRowId={user => user.id}
                initialState={{ pagination: { pageIndex: 0, pageSize: 4 } }}
            />
        </>
    )
}
export const Users: Story = { render: () => <UsersExample /> }
export const Empty: Story = {
    render: () => (
        <DataTable data={[]} columns={columns} caption="Gebruikers" />
    ),
}
export const Loading: Story = {
    render: () => (
        <DataTable
            data={users}
            columns={columns}
            caption="Gebruikers"
            isLoading
        />
    ),
}
