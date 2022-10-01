/**
 * @file Test Fixture - volume
 * @module tests/setup/volume
 * @see https://github.com/streamich/memfs
 */

import { Volume } from 'memfs/lib/volume'

/**
 * Virtual file system.
 *
 * @const {Volume} volume
 */
const volume: Volume = Volume.fromNestedJSON({}, process.cwd())

/**
 * Support relative paths.
 *
 * @see https://github.com/streamich/memfs/blob/master/docs/relative-paths.md
 * @see https://github.com/streamich/memfs/issues/23
 */
volume.mkdirSync(process.cwd(), { recursive: true })

/**
 * Original `volume.reset` function.
 *
 * @const {Volume['reset']} reset
 */
const reset: Volume['reset'] = volume.reset.bind(volume)

/**
 * Clears the virtual file system, {@link volume}, and recursively recreates the
 * current working directory.
 *
 * @return {void} Nothing when complete
 */
volume.reset = function (): void {
  reset()
  volume.mkdirSync(process.cwd(), { recursive: true })
}

export default volume
