#!/usr/bin/env node

/**
 * @file CLI
 * @module toggle-pkg-type/cli
 */

import type { Command } from '#src/types'
import sade from 'sade'
import pkg from '../package.json' assert { type: 'json' }
import toggle from './toggle'

sade(`${pkg.name.replace(/.*\//, '')} [off|on]`)
  .version(pkg.version)
  .describe(pkg.description)
  .example('')
  .example('off')
  .example('on')
  .action((command?: Command): void => void toggle(command))
  .parse(process.argv)
