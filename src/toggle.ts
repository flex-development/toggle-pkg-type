/**
 * @file Toggle
 * @module toggle-pkg-type/toggle
 */

import type { Command } from '#src/types'
import * as mlly from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type { PackageJson } from '@flex-development/pkg-types'
import { isString, type Nilable, type Nullable } from '@flex-development/tutils'
import fs from 'node:fs'

/**
 * Enable or disable the [`type`][1] field in a `package.json` file.
 *
 * The field is disabled by changing the field name to `#type`. The field value
 * will not be modified.
 *
 * Command Manifest:
 *
 * - `NIL` (`null`, `undefined`): Disable `type` if enabled, re-enable otherwise
 * - `off`: Disable `type` field
 * - `on`: Re-enable `type` field
 *
 * This is a **no-op** under any of the following conditions:
 *
 * - A `package.json` file is not found
 * - The `type` field is not defined in the located manifest
 * - The `#type` field is not defined in the located manifest (i.e. the `type`
 *   field was not previously disabled)
 *
 * [1]: https://nodejs.org/api/packages.html#type
 *
 * @see {@linkcode Command}
 * @see {@linkcode mlly.ModuleId}
 *
 * @example
 *  toggle()
 * @example
 *  toggle('off')
 * @example
 *  toggle('on', new URL('.'))
 * @example
 *  toggle('on', process.env.npm_package_json)
 *
 * @param {Nilable<Command>?} [command=null] - Toggle command
 * @param {mlly.ModuleId?} [id='.'] - Module id of package directory or manifest
 * @return {void} Nothing when complete
 */
function toggle(
  command: Nilable<Command> = null,
  id: mlly.ModuleId = '.'
): void {
  const { pathname } = mlly.toURL(id)

  /**
   * Absolute path to directory containing `package.json` file.
   *
   * @const {string} directory
   */
  const directory: string = pathname.endsWith('package.json')
    ? pathe.dirname(pathname)
    : pathname

  /**
   * Initial `package.json` data.
   *
   * @var {Nullable<PackageJson>} pkg
   */
  let pkg: Nullable<PackageJson> = mlly.readPackageJson(directory)

  // do nothing if package.json was not found, package type is not defined, or
  // if package type was not previously disabled
  if (!pkg || !isString(pkg.type ?? pkg['#type'])) return void pkg

  /**
   * Character used to disable `type` field.
   *
   * @const {string} HASH
   */
  const HASH: string = '#'

  // toggle package type
  pkg = Object.keys(pkg).reduce<PackageJson>((acc, key) => {
    const [, type, pre = ''] = new RegExp(`^((${HASH}?)type)$`).exec(key) ?? []

    if (type) {
      key = command
        ? `${command === 'off' ? HASH : ''}type`
        : pre
        ? type.replace(new RegExp('^' + pre), '')
        : HASH + type

      acc[key] = pkg![type]!
    } else {
      acc[key] = pkg![key]!
    }

    return acc
  }, {})

  // rewrite package.json
  return void fs.writeFileSync(
    pathe.join(directory, 'package.json'),
    JSON.stringify(pkg, null, 2) + '\n'
  )
}

export default toggle
