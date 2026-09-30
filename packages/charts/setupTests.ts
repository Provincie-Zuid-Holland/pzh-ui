// SPDX-License-Identifier: ISC
// SPDX-FileCopyrightText: 2025 Studio Twin

import '@testing-library/jest-dom'

import { cleanup } from '@testing-library/react'
import { afterEach, expect } from 'vitest'
import type { AxeMatchers } from 'vitest-axe/matchers'
import * as axeMatchers from 'vitest-axe/matchers'

expect.extend(axeMatchers)

declare module 'vitest' {
    // The type parameter must match vitest's own declaration for the augmentation to merge.
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars
    interface Assertion<T> extends AxeMatchers {}
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface AsymmetricMatchersContaining extends AxeMatchers {}
}

// Reset the DOM between tests so render output never leaks across cases.
afterEach(() => {
    cleanup()
})
