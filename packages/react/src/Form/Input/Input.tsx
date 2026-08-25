'use client'

import * as React from 'react'
import {
    composeRenderProps,
    Input as InputPrimitive,
} from 'react-aria-components'

import { type VariantProps } from 'class-variance-authority'

import { cn } from '../../utils'
import { inputControlVariants, inputPaddingVariants } from './Input.variants'

export type InputProps = Omit<
    React.ComponentProps<typeof InputPrimitive>,
    'size'
> &
    VariantProps<typeof inputControlVariants>

function Input({ className, type, size = 'l', ...props }: InputProps) {
    return (
        <InputPrimitive
            type={type}
            data-slot="input"
            data-size={size}
            className={composeRenderProps(className, className =>
                cn(
                    inputControlVariants({ size }),
                    inputPaddingVariants({ size }),

                    'appearance-none',
                    'placeholder:text-text-subtle',

                    'focus-visible:border-transparent',
                    'focus-visible:ring-2',
                    'focus-visible:ring-focus',

                    'disabled:pointer-events-none',
                    'disabled:cursor-not-allowed',
                    'disabled:bg-input-disabled',
                    'disabled:text-text-subtle',

                    'read-only:bg-surface-muted',

                    className
                )
            )}
            {...props}
        />
    )
}

export { Input }
