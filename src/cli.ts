#!/usr/bin/env node

/**
 * @file CLI
 * @module toggle-pkg-type/cli
 */

import type { Command } from '#src/types'
import type { Nilable } from '@flex-development/tutils'
import type mri from 'mri'
import sade from 'sade'
import pkg from '../package.json' assert { type: 'json' }
import toggle from './toggle'

sade(`${pkg.name.replace(/.*\//, '')} [off|on]`)
  .version(pkg.version)
  .describe(pkg.description)
  .example('')
  .example('--id /path/to/manifest')
  .example('off')
  .example('on')
  .option(
    '-i, --id',
    'Module id of package directory or manifest',
    'process.env.npm_package_json'
  )
  .action(function handler(
    command: Nilable<Command>,
    flags: mri.Argv<{ id?: string | undefined }>
  ): void {
    const { npm_package_json } = process.env
    if (flags.id === 'process.env.npm_package_json') flags.id = npm_package_json
    return void toggle(command, flags.id)
  })
  .parse(process.argv)
