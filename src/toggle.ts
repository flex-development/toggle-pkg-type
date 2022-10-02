/**
 * @file Toggle
 * @module toggle-pkg-type/toggle
 */

import fs from 'node:fs'
import path from 'node:path'
import type { PackageJson } from 'type-fest'

/**
 * Enables or disables [`type`][1] in `package.json`.
 *
 * [1]: https://nodejs.org/api/packages.html#type
 *
 * @example
 *  toggle()
 * @example
 *  toggle('off')
 * @example
 *  toggle('on')
 *
 * @param {'off' | 'on'} [command] - Toggle command
 * @return {void} Nothing when complete
 */
function toggle(command?: 'off' | 'on'): void {
  // see: https://yarnpkg.com/advanced/lifecycle-scripts#environment-variables
  const { npm_package_json = 'package.json' } = process.env

  /**
   * Absolute path to `package.json`.
   *
   * @const {string} pkgfile
   */
  const pkgfile: string = path.resolve(npm_package_json)

  /**
   * `package.json` data.
   *
   * @var {PackageJson} pkg
   */
  let pkg: PackageJson = JSON.parse(fs.readFileSync(pkgfile, 'utf8'))

  // toggle package type
  pkg = Object.keys(pkg).reduce<PackageJson>((acc, key) => {
    const [, type, prefix = ''] = /^((#?)type)$/.exec(key) ?? []

    if (type) {
      key = command
        ? `${command === 'off' ? '#' : ''}type`
        : prefix
        ? type.replace(new RegExp('^' + prefix), '')
        : '#' + type

      acc[key] = pkg[type]!
    } else {
      acc[key] = pkg[key]!
    }

    return acc
  }, {})

  // rewrite package.json
  return void fs.writeFileSync(pkgfile, JSON.stringify(pkg, null, 2) + '\n')
}

export default toggle
