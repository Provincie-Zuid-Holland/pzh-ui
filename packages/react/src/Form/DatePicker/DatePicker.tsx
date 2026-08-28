'use client'

import * as React from 'react'

import { Calendar as CalendarIcon, CalendarSolid } from '@pzh-ui/icons'

import { parseDate, type CalendarDate } from '@internationalized/date'

import { Calendar } from '../../Calendar'
import { Popover, PopoverTrigger } from '../../Popover'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '../InputGroup'

type CalendarProps = React.ComponentProps<
    typeof Calendar<CalendarDate, 'single'>
>

export type DatePickerProps = Omit<
    React.ComponentProps<typeof InputGroupInput>,
    'size' | 'value' | 'defaultValue' | 'onChange'
> & {
    size?: 'l' | 'm'
    value?: CalendarDate | null
    defaultValue?: CalendarDate | null
    onChange?: (value: CalendarDate) => void
    calendarProps?: Omit<
        CalendarProps,
        | 'value'
        | 'defaultValue'
        | 'onChange'
        | 'focusedValue'
        | 'onFocusChange'
        | 'selectionMode'
    >
}

function formatDate(date?: CalendarDate | null) {
    if (!date) {
        return ''
    }

    return [
        String(date.day).padStart(2, '0'),
        String(date.month).padStart(2, '0'),
        date.year,
    ].join('-')
}

function parseInputDate(value: string) {
    const match = value.trim().match(/^(\d{2})-(\d{2})-(\d{4})$/)

    if (!match) {
        return undefined
    }

    const [, day, month, year] = match

    try {
        return parseDate(`${year}-${month}-${day}`)
    } catch {
        return undefined
    }
}

function DatePicker({
    size = 'l',
    value: controlledValue,
    defaultValue,
    onChange,
    calendarProps,
    placeholder = 'Kies een dag',
    disabled,
    onKeyDown,
    ...props
}: DatePickerProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState<
        CalendarDate | null | undefined
    >(defaultValue)

    const value =
        controlledValue !== undefined ? controlledValue : internalValue

    const [inputValue, setInputValue] = React.useState(() => formatDate(value))

    const [focusedValue, setFocusedValue] = React.useState<
        CalendarDate | undefined
    >(value ?? undefined)

    React.useEffect(() => {
        if (controlledValue !== undefined) {
            setInputValue(formatDate(controlledValue))
            setFocusedValue(controlledValue ?? undefined)
        }
    }, [controlledValue])

    const handleChange = (nextValue: CalendarDate) => {
        if (controlledValue === undefined) {
            setInternalValue(nextValue)
        }

        setInputValue(formatDate(nextValue))
        setFocusedValue(nextValue)
        setIsOpen(false)

        onChange?.(nextValue)
    }

    return (
        <InputGroup size={size}>
            <InputGroupInput
                {...props}
                value={inputValue}
                placeholder={placeholder}
                disabled={disabled}
                onChange={event => {
                    const nextInputValue = event.target.value

                    setInputValue(nextInputValue)

                    const nextValue = parseInputDate(nextInputValue)

                    if (!nextValue) {
                        return
                    }

                    if (controlledValue === undefined) {
                        setInternalValue(nextValue)
                    }

                    setFocusedValue(nextValue)
                    onChange?.(nextValue)
                }}
                onKeyDown={event => {
                    onKeyDown?.(event)

                    if (event.defaultPrevented) {
                        return
                    }

                    if (event.key === 'ArrowDown') {
                        event.preventDefault()
                        setIsOpen(true)
                    }
                }}
            />

            {!disabled && (
                <InputGroupAddon align="inline-end">
                    <PopoverTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                        <InputGroupButton
                            variant="default"
                            size={size}
                            aria-label="Kies een datum"
                            className="p-0 size-4 rounded-none border-0 bg-transparent text-primary hover:bg-transparent">
                            {isOpen ? <CalendarSolid /> : <CalendarIcon />}
                        </InputGroupButton>

                        <Popover
                            placement="bottom start"
                            offset={4}
                            className="p-0 w-auto overflow-hidden">
                            <Calendar<CalendarDate, 'single'>
                                {...calendarProps}
                                selectionMode="single"
                                value={value}
                                focusedValue={focusedValue}
                                onFocusChange={setFocusedValue}
                                onChange={handleChange}
                            />
                        </Popover>
                    </PopoverTrigger>
                </InputGroupAddon>
            )}
        </InputGroup>
    )
}

export { DatePicker }
