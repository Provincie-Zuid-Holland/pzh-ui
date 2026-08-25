'use client'

import {
    Button as ButtonPrimitive,
    NumberField as NumberFieldPrimitive,
    type NumberFieldProps as NumberFieldPrimitiveProps,
} from 'react-aria-components'

import { AngleDown, AngleUp } from '@pzh-ui/icons'

import { cn } from '../../utils'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../InputGroup'

export type NumberInputProps = NumberFieldPrimitiveProps & {
    size?: 'l' | 'm'
    className?: string
    placeholder?: string
}

function NumberInput({
    size = 'l',
    placeholder = '0',
    className,
    ...props
}: NumberInputProps) {
    return (
        <NumberFieldPrimitive
            data-slot="number-input"
            {...props}
            className={cn('w-full', className)}>
            <InputGroup size={size}>
                <InputGroupAddon align="inline-start">
                    <div className="flex flex-col">
                        <ButtonPrimitive
                            slot="increment"
                            aria-label="Verhogen"
                            className={cn(
                                'flex items-center justify-center',
                                'cursor-pointer',
                                'text-primary',
                                'outline-none',
                                'focus-visible:ring-2',
                                'focus-visible:ring-focus',
                                'disabled:cursor-not-allowed',
                                'disabled:text-text-subtle'
                            )}>
                            <AngleUp size={14} />
                        </ButtonPrimitive>

                        <ButtonPrimitive
                            slot="decrement"
                            aria-label="Verlagen"
                            className={cn(
                                'flex items-center justify-center',
                                'cursor-pointer',
                                'text-primary',
                                'outline-none',
                                'focus-visible:ring-2',
                                'focus-visible:ring-focus',
                                'disabled:cursor-not-allowed',
                                'disabled:text-text-subtle'
                            )}>
                            <AngleDown size={14} />
                        </ButtonPrimitive>
                    </div>
                </InputGroupAddon>

                <InputGroupInput
                    className="text-right tabular-nums"
                    inputMode="decimal"
                    placeholder={placeholder}
                />
            </InputGroup>
        </NumberFieldPrimitive>
    )
}

export { NumberInput }
