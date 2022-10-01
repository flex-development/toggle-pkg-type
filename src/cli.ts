#!/usr/bin/env node

/**
 * @file CLI
 * @module toggle-pkg-type/cli
 */

import sade from 'sade'
import pkg from '../package.json' assert { type: 'json' }

sade(`${pkg.name.replace(/.*\//, '')} [off|on]`)
  .version(pkg.version)
  .describe(pkg.description)
  .action((): void => void 0)
  .parse(process.argv)
