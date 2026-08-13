'use client'

import { type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import {
    composeRenderProps,
    TextArea as TextareaPrimitive,
} from 'react-aria-components'

import { cn } from '../../utils'
import {
    inputControlVariants,
    inputPaddingVariants,
} from '../Input/Input.variants'

export type TextareaProps = Omit<
    React.ComponentProps<typeof TextareaPrimitive>,
    'size'
> &
    VariantProps<typeof inputControlVariants>

function Textarea({ className, size = 'l', ...props }: TextareaProps) {
    return (
        <TextareaPrimitive
            data-slot="textarea"
            data-size={size}
            data-testid="textarea"
            className={composeRenderProps(className, className =>
                cn(
                    inputControlVariants({ size }),
                    inputPaddingVariants({ size }),

                    'field-sizing-content min-h-30 resize-y',
                    'placeholder:text-text-muted',

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

export { Textarea }
