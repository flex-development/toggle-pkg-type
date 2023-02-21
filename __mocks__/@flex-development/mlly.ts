/**
 * @file Mocks - @flex-development/mlly
 * @module mocks/flex-development/mlly
 * @see https://github.com/flex-development/mlly
 */

/**
 * [`@flex-development/mlly`][1] module type.
 *
 * [1]: https://github.com/flex-development/mlly
 */
type Actual = typeof import('@flex-development/mlly')

/**
 * `@flex-development/mlly` module.
 *
 * @const {Actual} actual
 */
const actual: Actual = await vi.importActual<Actual>('@flex-development/mlly')

export const readPackageJson = vi.fn(actual.readPackageJson)
export const toURL = vi.fn(actual.toURL)
