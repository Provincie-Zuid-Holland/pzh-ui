'use client'

import { Eye, EyeSlash } from '@pzh-ui/icons'
import { useState } from 'react'

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '../InputGroup'

export type PasswordInputProps = Omit<
    React.ComponentProps<typeof InputGroupInput>,
    'type' | 'size'
> & {
    size?: 'l' | 'm'
    showToggle?: boolean
}

function PasswordInput({
    size = 'l',
    showToggle = true,
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

    return (
        <InputGroup size={size} data-testid="password-input">
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
                        className="text-primary rounded-none border-0 bg-transparent px-4 hover:bg-transparent">
                        {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                    </InputGroupButton>
                </InputGroupAddon>
            )}
        </InputGroup>
    )
}

export { PasswordInput }
