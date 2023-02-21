/**
 * @file Mocks - fs
 * @module mocks/fs
 * @see https://nodejs.org/api/fs.html
 */

import volume from '#fixtures/volume'
import type fs from 'node:fs'

/**
 * Synchronously writes `data` to `file`, replacing `file` if it already exists.
 *
 * @see https://nodejs.org/api/fs.html#fswritefilesyncfile-data-options
 *
 * @param {fs.PathOrFileDescriptor} file - Filename or file descriptor
 * @param {ArrayBufferView | string} data - File content
 * @param {fs.WriteFileOptions} [options] - Write options
 * @return {Promise<void>} Nothing when complete
 */
export const writeFileSync = vi
  .fn(volume.writeFileSync.bind(volume))
  .mockName('writeFileSync')

export default { writeFileSync }
