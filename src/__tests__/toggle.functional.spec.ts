/**
 * @file Functional Tests - toggle
 * @module toggle-pkg-type/tests/functional/toggle
 */

import vfs from '#fixtures/volume'
import type { Spy } from '#tests/interfaces'
import * as mlly from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type { PackageJson, Type } from '@flex-development/pkg-types'
import fs from 'node:fs'
import testSubject from '../toggle'

vi.mock('@flex-development/mlly')
vi.mock('fs')

describe('functional:toggle', () => {
  let id: string
  let mockReadPackageJson: Spy<(typeof mlly)['readPackageJson']>
  let pkg: PackageJson
  let type: Type

  afterEach(() => {
    vfs.reset()
  })

  beforeAll(() => {
    id = pathe.resolve('package.json')
    pkg = { name: 'foo-package' }
    type = 'module'

    mockReadPackageJson =
      mlly.readPackageJson as unknown as typeof mockReadPackageJson
  })

  it('should do nothing if package.json file is not found', () => {
    // Act
    testSubject(null, '__fixtures__/package.json')

    // Expect
    expect(fs.writeFileSync).toHaveBeenCalledTimes(0)
  })

  it('should do nothing if package type cannot be toggled', () => {
    // Arrange
    mockReadPackageJson.mockReturnValueOnce(pkg)

    // Act
    testSubject()

    // Expect
    expect(fs.writeFileSync).toHaveBeenCalledTimes(0)
  })

  describe('disable', () => {
    let data: string

    beforeAll(() => {
      data = `${JSON.stringify({ ...pkg, '#type': type }, null, 2)}\n`
    })

    beforeEach(() => {
      mockReadPackageJson.mockReturnValue({ ...pkg, type })
    })

    it('should disable package type given ["off"]', () => {
      // Act
      testSubject('off')

      // Expect
      expect(fs.writeFileSync).toHaveBeenCalledOnce()
      expect(fs.writeFileSync).toHaveBeenCalledWith(id, data)
      expect(vfs.toJSON()).to.have.property(pathe.resolve(id)).equal(data)
    })

    it('should disable package type given [null]', () => {
      // Act
      testSubject(null)

      // Expect
      expect(fs.writeFileSync).toHaveBeenCalledOnce()
      expect(fs.writeFileSync).toHaveBeenCalledWith(id, data)
      expect(vfs.toJSON()).to.have.property(pathe.resolve(id)).equal(data)
    })

    it('should disable package type given [undefined]', () => {
      // Act
      testSubject(undefined)

      // Expect
      expect(fs.writeFileSync).toHaveBeenCalledOnce()
      expect(fs.writeFileSync).toHaveBeenCalledWith(id, data)
      expect(vfs.toJSON()).to.have.property(pathe.resolve(id)).equal(data)
    })
  })

  describe('enable', () => {
    let data: string

    beforeAll(() => {
      data = `${JSON.stringify({ ...pkg, type }, null, 2)}\n`
    })

    beforeEach(() => {
      mockReadPackageJson.mockReturnValue({ ...pkg, '#type': type })
    })

    it('should enable package type given ["on"]', () => {
      // Act
      testSubject('on')

      // Expect
      expect(fs.writeFileSync).toHaveBeenCalledOnce()
      expect(fs.writeFileSync).toHaveBeenCalledWith(id, data)
      expect(vfs.toJSON()).to.have.property(pathe.resolve(id)).equal(data)
    })

    it('should enable package type given [null]', () => {
      // Act
      testSubject(null)

      // Expect
      expect(fs.writeFileSync).toHaveBeenCalledOnce()
      expect(fs.writeFileSync).toHaveBeenCalledWith(id, data)
      expect(vfs.toJSON()).to.have.property(pathe.resolve(id)).equal(data)
    })

    it('should enable package type given [undefined]', () => {
      // Act
      testSubject(undefined)

      // Expect
      expect(fs.writeFileSync).toHaveBeenCalledOnce()
      expect(fs.writeFileSync).toHaveBeenCalledWith(id, data)
      expect(vfs.toJSON()).to.have.property(pathe.resolve(id)).equal(data)
    })
  })
})
