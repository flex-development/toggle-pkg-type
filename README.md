# toggle-pkg-type

[![npm](https://img.shields.io/npm/v/@flex-development/toggle-pkg-type.svg)](https://npmjs.com/package/@flex-development/toggle-pkg-type)
[![module type: esm](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![license](https://img.shields.io/github/license/flex-development/toggle-pkg-type.svg)](LICENSE.md)
[![conventional commits](https://img.shields.io/badge/-conventional%20commits-fe5196?logo=conventional-commits&logoColor=ffffff)](https://conventionalcommits.org/)
[![typescript](https://img.shields.io/badge/-typescript-3178c6?logo=typescript&logoColor=ffffff)](https://typescriptlang.org/)
[![vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat&logo=vitest&logoColor=ffffff)](https://vitest.dev/)
[![yarn](https://img.shields.io/badge/-yarn-2c8ebb?style=flat&logo=yarn&logoColor=ffffff)](https://yarnpkg.com/)

Toggle [`type`][1] fields in `package.json` files

## Contents

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)
- [API](#api)
  - [`toggle([command][, id])`](#togglecommand-id)
- [Types](#types)
  - [Type Definitions](#type-definitions)
- [Contribute](#contribute)

## What is this?

This package lets you toggle [`type`][1] fields in `package.json` files.

## When should I use this?

`toggle-pkg-type` was created as a workaround for [`evanw/esbuild#2026`][2].

Use this package when you use `default` exports and also [ship code in ES module and CommonJS format][3].

The original issue was closed as "working as intended", but the solution provided is not suitable for all users:

> Setting `"type": "module"` in your `package.json` means "I need to use node's behavior" for both Webpack and esbuild.
> If you don't need node's behavior, then just remove `"type": "module"` from your `package.json`.

This logic does not account for needing `"type": "module"` in development, but not when building CommonJS modules (i.e
running tests or using a custom [loader][4]).

## Install

This package is [ESM only][5].

```sh
yarn add -D @flex-development/toggle-pkg-type
```

From Git:

```sh
yarn add -D @flex-development/toggle-pkg-type@flex-development/toggle-pkg-type
```

<blockquote>
  <small>
    See <a href='https://yarnpkg.com/features/protocols#git'>Git - Protocols | Yarn</a>
    &nbsp;for details on requesting a specific branch, commit, or tag.
  </small>
</blockquote>

## Use

```sh
  Usage
    $ toggle-pkg-type [off|on] [options]

  Options
    -i, --id         Module id of package directory or manifest  (default process.env.npm_package_json)
    -v, --version    Displays current version
    -h, --help       Displays this message

  Examples
    $ toggle-pkg-type
    $ toggle-pkg-type --id /path/to/manifest
    $ toggle-pkg-type off
    $ toggle-pkg-type on
```

## API

This package exports no identifiers. The default export is `toggle`.

### `toggle([command][, id])`

Enable or disable the [`type`][1] field in a `package.json` file.

The field is disabled by changing the field name to `#type`. The field value will not be modified.

Command Manifest:

- `NIL` (`null`, `undefined`): Disable `type` if enabled, re-enable otherwise
- `off`: Disable `type` field
- `on`: Re-enable `type` field

This is a **no-op** under any of the following conditions:

- A `package.json` file is not found
- The `type` field is not defined in the located manifest
- The `#type` field is not defined in the located manifest (i.e. the `type` field was not previously disabled)

#### Parameters

- `{Nilable<Command>?}` **`[command=null]`** &mdash; Toggle command
- `{mlly.ModuleId?}` **`[id='.']`** &mdash; Module id of package directory or manifest

#### Returns

`{void}` Nothing when complete.

#### Source

> [`src/toggle.ts`](src/toggle.ts)

## Types

This package is fully typed with [TypeScript][6].

### Type Definitions

- [`Command`](src/types/command.ts)

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

[1]: https://nodejs.org/api/packages.html#type
[2]: https://github.com/evanw/esbuild/issues/2026
[3]: https://github.com/flex-development/aggregate-error-ponyfill/blob/main/package.json#L33-L42
[4]: https://nodejs.org/api/esm.html#loaders
[5]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[6]: https://www.typescriptlang.org
