'use client'

import * as React from 'react'
import {
    Calendar as AriaCalendar,
    CalendarGridHeader as AriaCalendarGridHeader,
    RangeCalendar as AriaRangeCalendar,
    CalendarCell,
    CalendarGrid,
    CalendarGridBody,
    CalendarHeaderCell,
    CalendarHeading,
    CalendarMonthPicker,
    CalendarYearPicker,
    type CalendarCellRenderProps,
    type DateValue,
    type CalendarProps as ProvidedCalendarProps,
    type RangeCalendarProps as ProvidedRangeCalendarProps,
} from 'react-aria-components'

import { AngleLeft, AngleRight } from '@pzh-ui/icons'

import { cva } from 'class-variance-authority'

import { Button } from '../Button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../Form/Select'
import { cn } from '../utils'

const calendarCellVariants = cva(
    [
        'group/day',
        'relative',
        'mt-2',
        'h-(--cell-size)',
        'w-(--cell-size)',
        'p-0',
        'text-center',
        'select-none',
        'rounded-full',
    ],
    {
        variants: {
            isSelected: {
                true: '',
            },
            isToday: {
                true: '',
            },
            isSelectionStart: {
                true: '',
            },
            isSelectionEnd: {
                true: '',
            },
            isUnavailable: {
                true: 'text-text-disabled',
            },
            isDisabled: {
                true: 'text-text-disabled',
            },
            isOutsideMonth: {
                true: 'text-text-disabled',
            },
        },
    }
)

const calendarDayVariants = cva([
    'relative',
    'z-10',
    'flex',
    'size-(--cell-size)',
    'items-center',
    'justify-center',
    'rounded-full',
    'border-2',
    'border-transparent',
    'p-0',
    'text-s',
    'font-normal',
    'leading-none',
    'outline-none',
    'transition-colors',
    'select-none',

    'hover:bg-success-background',

    'group-data-[focused=true]/day:border-focus',

    'data-[selected-single=true]:bg-success',
    'data-[selected-single=true]:text-primary-foreground',

    'data-[range-start=true]:bg-success',
    'data-[range-start=true]:text-primary-foreground',
    'data-[range-start=true]:border-4 data-[range-start=true]:border-success-border',

    'data-[range-end=true]:bg-success',
    'data-[range-end=true]:text-primary-foreground',
    'data-[range-end=true]:border-4 data-[range-end=true]:border-success-border',

    'data-[range-middle=true]:rounded-none',
    'data-[range-middle=true]:bg-success-border',
    'data-[range-middle=true]:text-primary-foreground',

    'group-data-[unavailable=true]/day:line-through',
])

export type CalendarProps<
    T extends DateValue,
    M extends 'single' | 'multiple' = 'single',
> = Omit<ProvidedCalendarProps<T, M>, 'visibleDuration'> & {
    buttonVariant?: React.ComponentProps<typeof Button>['variant']
    captionLayout?: 'label' | 'dropdown'
    numberOfMonths?: number
    showWeekNumber?: boolean
    headerFormat?: Intl.DateTimeFormatOptions
    renderCell?: (
        renderProps: CalendarCellRenderProps & {
            defaultChildren: React.ReactNode
        }
    ) => React.ReactNode
}

function Calendar<
    T extends DateValue,
    M extends 'single' | 'multiple' = 'single',
>(props: CalendarProps<T, M>) {
    const {
        buttonVariant,
        captionLayout,
        numberOfMonths,
        showWeekNumber,
        headerFormat,
        renderCell,
        className,
        ...calendarProps
    } = props

    return (
        <AriaCalendar
            {...calendarProps}
            data-slot="calendar"
            visibleDuration={{ months: numberOfMonths || 1 }}
            className={cn(
                'group/calendar rounded p-2 w-max bg-background',
                '[--cell-size:2.5rem]',
                className
            )}>
            <CalendarInner
                buttonVariant={buttonVariant}
                captionLayout={captionLayout}
                numberOfMonths={numberOfMonths}
                showWeekNumber={showWeekNumber}
                headerFormat={headerFormat}
                renderCell={renderCell}
            />
        </AriaCalendar>
    )
}

export type RangeCalendarProps<T extends DateValue> =
    ProvidedRangeCalendarProps<T> & {
        buttonVariant?: React.ComponentProps<typeof Button>['variant']
        captionLayout?: 'label' | 'dropdown'
        headerFormat?: Intl.DateTimeFormatOptions
        numberOfMonths?: number
        showWeekNumber?: boolean
        renderCell?: (
            renderProps: CalendarCellRenderProps & {
                defaultChildren: React.ReactNode
            }
        ) => React.ReactNode
    }

function RangeCalendar<T extends DateValue>(props: RangeCalendarProps<T>) {
    const {
        buttonVariant,
        captionLayout,
        numberOfMonths,
        showWeekNumber,
        headerFormat,
        renderCell,
        className,
        ...calendarProps
    } = props

    return (
        <AriaRangeCalendar
            {...calendarProps}
            data-slot="calendar"
            visibleDuration={{ months: numberOfMonths || 1 }}
            className={cn(
                'group/calendar rounded p-2 w-max bg-background',
                '[--cell-size:2.5rem]',
                className
            )}>
            <CalendarInner
                buttonVariant={buttonVariant}
                captionLayout={captionLayout}
                numberOfMonths={numberOfMonths}
                showWeekNumber={showWeekNumber}
                headerFormat={headerFormat}
                renderCell={renderCell}
                isRange
            />
        </AriaRangeCalendar>
    )
}

function CalendarInner({
    captionLayout = 'label',
    buttonVariant = 'diapositive',
    numberOfMonths = 1,
    headerFormat,
    renderCell,
    isRange = false,
}: {
    buttonVariant?: React.ComponentProps<typeof Button>['variant']
    captionLayout?: 'label' | 'dropdown'
    numberOfMonths?: number
    showWeekNumber?: boolean
    headerFormat?: Intl.DateTimeFormatOptions
    renderCell?: (
        renderProps: CalendarCellRenderProps & {
            defaultChildren: React.ReactNode
        }
    ) => React.ReactNode
    isRange?: boolean
}) {
    return (
        <div className="gap-8 md:flex-row relative flex flex-col text-primary">
            <header className="inset-x-0 top-0 pointer-events-none absolute z-20 flex w-full items-center justify-between">
                <Button
                    variant={buttonVariant}
                    size="s"
                    slot="previous"
                    aria-label="Vorige maand"
                    className="p-0 pointer-events-auto size-(--cell-size) select-none aria-disabled:opacity-50">
                    <AngleLeft className="size-4 cn-rtl-flip" />
                </Button>

                <Button
                    variant={buttonVariant}
                    size="s"
                    slot="next"
                    aria-label="Volgende maand"
                    className="p-0 pointer-events-auto size-(--cell-size) select-none aria-disabled:opacity-50">
                    <AngleRight className="size-4 cn-rtl-flip" />
                </Button>
            </header>

            {Array.from({ length: numberOfMonths }, (_, index) => (
                <div
                    key={index}
                    className="min-w-56 gap-4 flex w-full flex-col">
                    <div className="gap-1 flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)">
                        {captionLayout === 'dropdown' ? (
                            <>
                                <MonthDropdown format={headerFormat} />
                                <YearDropdown format={headerFormat} />
                            </>
                        ) : (
                            <CalendarHeading
                                offset={{ months: index }}
                                format={headerFormat}
                                className="text-s font-bold select-none"
                            />
                        )}
                    </div>

                    <CalendarGrid
                        className="w-full border-collapse"
                        offset={{ months: index }}
                        weekdayStyle="short">
                        <AriaCalendarGridHeader>
                            {day => (
                                <CalendarHeaderCell className="rounded text-xs font-bold text-muted-foreground h-(--cell-size) select-none">
                                    {day}
                                </CalendarHeaderCell>
                            )}
                        </AriaCalendarGridHeader>

                        <CalendarGridBody>
                            {date => (
                                <CalendarCell
                                    date={date}
                                    className={renderProps => {
                                        const isSingleDayRange =
                                            isRange &&
                                            renderProps.isSelectionStart &&
                                            renderProps.isSelectionEnd

                                        return cn(
                                            calendarCellVariants(renderProps),

                                            isRange &&
                                                renderProps.isSelected &&
                                                !renderProps.isSelectionStart &&
                                                !renderProps.isSelectionEnd &&
                                                'bg-success-border',

                                            isRange &&
                                                renderProps.isSelectionStart &&
                                                !isSingleDayRange &&
                                                'after:inset-y-0 after:right-0 after:absolute after:left-1/2 after:bg-success-border',

                                            isRange &&
                                                renderProps.isSelectionEnd &&
                                                !isSingleDayRange &&
                                                'before:inset-y-0 before:left-0 before:absolute before:right-1/2 before:bg-success-border'
                                        )
                                    }}>
                                    {renderProps => {
                                        const isSelectedSingle =
                                            renderProps.isSelected && !isRange

                                        const isRangeStart =
                                            renderProps.isSelectionStart &&
                                            isRange

                                        const isRangeEnd =
                                            renderProps.isSelectionEnd &&
                                            isRange

                                        const isRangeMiddle =
                                            renderProps.isSelected &&
                                            !renderProps.isSelectionStart &&
                                            !renderProps.isSelectionEnd &&
                                            isRange

                                        return (
                                            <div
                                                data-selected-single={
                                                    isSelectedSingle ||
                                                    undefined
                                                }
                                                data-range-start={
                                                    isRangeStart || undefined
                                                }
                                                data-range-end={
                                                    isRangeEnd || undefined
                                                }
                                                data-range-middle={
                                                    isRangeMiddle || undefined
                                                }
                                                data-today={
                                                    renderProps.isToday ||
                                                    undefined
                                                }
                                                className={cn(
                                                    calendarDayVariants(),
                                                    renderProps.isToday &&
                                                        !renderProps.isSelected &&
                                                        'border-success text-success'
                                                )}>
                                                {renderCell
                                                    ? renderCell(renderProps)
                                                    : renderProps.defaultChildren}
                                            </div>
                                        )
                                    }}
                                </CalendarCell>
                            )}
                        </CalendarGridBody>
                    </CalendarGrid>
                </div>
            ))}
        </div>
    )
}

function MonthDropdown({ format }: { format?: Intl.DateTimeFormatOptions }) {
    return (
        <CalendarMonthPicker format={format?.month ?? 'long'}>
            {props => (
                <Select {...props} size="m" className="relative">
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent className="min-w-0">
                        <SelectGroup>
                            {props.items.map(item => (
                                <SelectItem key={item.id} id={item.id}>
                                    {item.formatted}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
        </CalendarMonthPicker>
    )
}

function YearDropdown({ format }: { format?: Intl.DateTimeFormatOptions }) {
    return (
        <CalendarYearPicker format={format}>
            {props => (
                <Select {...props} size="m" className="relative">
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent className="min-w-0">
                        <SelectGroup>
                            {props.items.map(item => (
                                <SelectItem key={item.id} id={item.id}>
                                    {item.formatted}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
        </CalendarYearPicker>
    )
}

export { Calendar, RangeCalendar }
