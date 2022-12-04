/**
 * @file Functional Tests - toggle
 * @module toggle-pkg-type/tests/toggle/functional
 */

import vfs from '#fixtures/volume'
import type { PackageJson } from '@flex-development/pkg-types'
import testSubject from '../toggle'

vi.mock('node:fs')

describe('functional:toggle', () => {
  afterEach(() => {
    vfs.reset()
  })

  it('should do nothing if package type is undefined', () => {
    // Arrange
    const pkg: PackageJson = { name: 'foo', version: '1.0.0' }
    const pkgstring: string = JSON.stringify(pkg, null, 2) + '\n'
    vfs.writeFileSync('./package.json', pkgstring)

    // Act
    testSubject()

    // Expect
    expect(vfs.readFileSync('./package.json', 'utf8')).to.equal(pkgstring)
  })

  describe('disable', () => {
    const pkg: PackageJson = { type: 'module' }

    beforeEach(() => {
      vfs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2) + '\n')
    })

    it('should disable package type with "off"', () => {
      // Act
      testSubject('off')

      // Expect
      expect(JSON.parse(vfs.readFileSync('./package.json', 'utf8') as string))
        .to.have.property('#type')
        .that.equals(pkg.type)
    })

    it('should disable package type without command', () => {
      // Act
      testSubject()

      // Expect
      expect(JSON.parse(vfs.readFileSync('./package.json', 'utf8') as string))
        .to.have.property('#type')
        .that.equals(pkg.type)
    })
  })

  describe('enable', () => {
    const pkg: PackageJson = { '#type': 'module' }

    beforeEach(() => {
      vfs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2) + '\n')
    })

    it('should enable package type with "on"', () => {
      // Act
      testSubject('on')

      // Expect
      expect(JSON.parse(vfs.readFileSync('./package.json', 'utf8') as string))
        .to.have.property('type')
        .that.equals(pkg['#type'])
    })

    it('should enable package type without command', () => {
      // Act
      testSubject()

      // Expect
      expect(JSON.parse(vfs.readFileSync('./package.json', 'utf8') as string))
        .to.have.property('type')
        .that.equals(pkg['#type'])
    })
  })
})
