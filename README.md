# 🍊 Tangerine monorepo

A _"fast"_ TypeScript-based Node.js monorepo setup powered by esbuild.  
Feel free to use it as a template/boilerplate for your own monorepos. 

## Features

This monorepo is a boilerplate for TypeScript-based Node.js projects, powered by esbuild.

- Uses [TypeScript](https://www.typescriptlang.org/) to write code, tests, and scripts.
- Uses [esbuild](https://esbuild.github.io/) to compile your TypeScript codebase, tests, and scripts.
- Uses [tsc CLI](https://www.typescriptlang.org/docs/handbook/compiler-options.html) to type-check the codebase without emitting the compiled files (since they're handled by esbuild). No need to keep [TypeScript's Project References](https://www.typescriptlang.org/docs/handbook/project-references.html) up-to-date.
- Uses [esbuild-runner](https://github.com/folke/esbuild-runner) to run scripts on the fly.
- Uses [Yarn workspaces](https://yarnpkg.com/features/workspaces) to make it easy to work within the monorepo.
- Uses [Ultra runner](https://github.com/folke/ultra-runner) to run scripts from the project root.
- Uses a shareable [ESLint config](./packages/eslint-config) and [Jest config](./packages/jest-config) to provide an extensible linting and testing setup.
- Uses esbuild + [nodemon](https://github.com/remy/nodemon) to reload the server in development mode (even when workspace dependencies are changed).

## Workspaces structure

```bash
.
└── <project-root>/
    └── packages/
        ├── eslint-config/ # eslint-config shared across the workspaces
        ├── is-even/ # simple Node.js module example (with no dependencies)
        ├── is-odd/ # simple Node.js module example (depends on is-even)
        ├── jest-config/ # jest-config shared across the workspaces
        └── server/ # simple Node.js server example (depends on is-even and is-odd)
```

## FAQs

### Why are you using Yarn Classic instead of Yarn 2+?

Mainly because every time I use Yarn 2+ I encounter tiny issues requiring additional fixes or setup (e.g., [Editor SDKs](https://yarnpkg.com/getting-started/editor-sdks)).  
If you prefer Yarn 2+, switching to it is as easy as running `yarn set version berry` 👍 (at that point you can even stop using ultra-runner and use `yarn workspaces foreach` instead).

### Why esbuild? Why not [swc](https://github.com/swc-project/swc)?

I love [swc](https://github.com/swc-project/swc), but I feel esbuild is still more "mature". I've also noticed that in some cases swc doesn't respect TypeScript's `compilerOptions`'s `paths`.

### Why are you pointing the package.json's `main` and `types` entry to uncompiled code?

See ["You might not need TypeScript project references" on the Turborepo blog](https://turborepo.com/posts/you-might-not-need-typescript-project-references). This pattern has been working fine for my use cases so far (especially while using esbuild). Still, you might want to update these entries to suit your needs.
