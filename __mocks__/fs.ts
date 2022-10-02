/**
 * @file Mocks - fs
 * @module mocks/fs
 * @see https://nodejs.org/docs/latest-v16.x/api/fs.html
 */

import volume from '#fixtures/volume'
import type { TDataOut } from 'memfs/lib/encoding'
import type { IWriteFileOptions, TData, TFileId } from 'memfs/lib/volume'

/**
 * Synchronously returns the contents of `path`.
 *
 * @see https://nodejs.org/docs/latest-v16.x/api/fs.html#fsreadfilesyncpath-options
 *
 * @param {TFileId} path - Filename or file descriptor
 * @param {IWriteFileOptions | string} [options] - Read file options
 * @return {TDataOut} File content
 */
export const readFileSync = vi.fn(volume.readFileSync.bind(volume))

/**
 * Synchronously writes `data` to `file`, replacing `file` if it already exists.
 *
 * @see https://nodejs.org/docs/latest-v16.x/api/fs.html#fswritefilesyncfile-data-options
 *
 * @param {TFileId} file - Filename or file descriptor
 * @param {TData} data - File content
 * @param {IWriteFileOptions} [options] - Write file options
 * @return {Promise<void>} Nothing when complete
 */
export const writeFileSync = vi.fn(volume.writeFileSync.bind(volume))

export default {
  readFileSync,
  writeFileSync
}
