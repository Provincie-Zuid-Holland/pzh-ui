'use client'

import { useState } from 'react'

import { Eye, EyeSlash } from '@pzh-ui/icons'

import { cn } from '../../utils'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '../InputGroup'

type PasswordStrength = 'weak' | 'medium' | 'strong'

const passwordStrengthConfig = {
    weak: {
        label: 'Zwak',
        width: 'w-1/4',
        className: 'bg-destructive-border',
        textClassName: 'text-destructive',
    },
    medium: {
        label: 'Niet zo goed',
        width: 'w-1/2',
        className: 'bg-warning',
        textClassName: 'text-text-muted',
    },
    strong: {
        label: 'Sterk',
        width: 'w-full',
        className: 'bg-success-border',
        textClassName: 'text-success',
    },
} satisfies Record<
    PasswordStrength,
    {
        label: string
        width: string
        className: string
        textClassName: string
    }
>

function getDefaultStrength(value: string): PasswordStrength {
    let score = 0

    if (value.length >= 8) score++
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++
    if (/\d/.test(value)) score++
    if (/[^A-Za-z0-9]/.test(value)) score++

    if (score >= 4) return 'strong'
    if (score >= 2) return 'medium'

    return 'weak'
}

export type PasswordInputProps = Omit<
    React.ComponentProps<typeof InputGroupInput>,
    'type' | 'size'
> & {
    size?: 'l' | 'm'
    showToggle?: boolean
    showStrength?: boolean
    getStrength?: (value: string) => PasswordStrength
}

function PasswordInput({
    size = 'l',
    showToggle = true,
    showStrength = false,
    getStrength = getDefaultStrength,
    value: controlledValue,
    defaultValue,
    onChange,
    ...props
}: PasswordInputProps) {
    const [internalValue, setInternalValue] = useState(
        String(defaultValue ?? '')
    )
    const [isVisible, setIsVisible] = useState(false)

    const value =
        controlledValue !== undefined ? String(controlledValue) : internalValue

    const strength = value.length > 0 ? getStrength(value) : undefined

    return (
        <div className="gap-2 flex w-full flex-col">
            <InputGroup size={size}>
                <InputGroupInput
                    {...props}
                    value={controlledValue}
                    defaultValue={defaultValue}
                    type={isVisible ? 'text' : 'password'}
                    onChange={event => {
                        if (controlledValue === undefined) {
                            setInternalValue(event.target.value)
                        }

                        onChange?.(event)
                    }}
                />

                {showToggle && value.length > 0 && !props.disabled && (
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton
                            variant="default"
                            size={size}
                            aria-label={
                                isVisible
                                    ? 'Wachtwoord verbergen'
                                    : 'Wachtwoord tonen'
                            }
                            onPress={() => setIsVisible(value => !value)}
                            className="px-4 rounded-none border-0 bg-transparent text-primary hover:bg-transparent">
                            {isVisible ? (
                                <EyeSlash size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </InputGroupButton>
                    </InputGroupAddon>
                )}
            </InputGroup>

            {showStrength && strength && (
                <PasswordStrengthMeter strength={strength} />
            )}
        </div>
    )
}

function PasswordStrengthMeter({ strength }: { strength: PasswordStrength }) {
    const config = passwordStrengthConfig[strength]

    return (
        <div
            className="flex flex-col"
            data-slot="password-strength"
            data-strength={strength}>
            <div
                className="h-1 w-full overflow-hidden rounded-full bg-border"
                role="meter"
                aria-label="Wachtwoordsterkte"
                aria-valuemin={1}
                aria-valuemax={3}
                aria-valuenow={
                    strength === 'weak' ? 1 : strength === 'medium' ? 2 : 3
                }>
                <div
                    className={cn(
                        'h-full rounded-full transition-[width,background-color]',
                        config.width,
                        config.className
                    )}
                />
            </div>

            <span className={cn('text-s', config.textClassName)}>
                {config.label}
            </span>
        </div>
    )
}

export { PasswordInput }
