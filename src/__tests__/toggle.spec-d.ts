/**
 * @file Type Tests - toggle
 * @module toggle-pkg-type/tests/unit-d/toggle
 */

import type { Command } from '#src/types'
import type * as mlly from '@flex-development/mlly'
import type { Nilable } from '@flex-development/tutils'
import type testSubject from '../toggle'

describe('unit-d:toggle', () => {
  it('should be callable with [Nilable<Command>?, mlly.ModuleId?]', () => {
    // Arrange
    type Expected = [command?: Nilable<Command>, id?: mlly.ModuleId | undefined]

    // Expect
    expectTypeOf<typeof testSubject>().parameters.toEqualTypeOf<Expected>()
  })

  it('should return void', () => {
    expectTypeOf<typeof testSubject>().returns.toBeVoid()
  })
})
