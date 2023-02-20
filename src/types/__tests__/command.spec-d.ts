/**
 * @file Type Tests - Command
 * @module toggle-pkg-type/types/tests/unit-d/Command
 */

import type TestSubject from '../command'

describe('unit-d:types/Command', () => {
  it('should extract "off"', () => {
    expectTypeOf<TestSubject>().extract<'off'>().toBeString()
  })

  it('should extract "on"', () => {
    expectTypeOf<TestSubject>().extract<'on'>().toBeString()
  })
})
