# 🍊 Tangerine monorepo

A _"fast"_ TypeScript-based Node.js monorepo setup powered by esbuild & turborepo.  
Feel free to use it as a template/boilerplate for your own monorepos.

See [**Speed up your TypeScript monorepo with esbuild**](https://mmazzarolo.com/blog/2021-11-06-speed-up-your-typescript-monorepo-with-esbuild/) for more info.

**Feb 3rd 2022 update: Tangerine monorepo now uses Turborepo for an even faster developer experience 🔥**

## Features

This monorepo is a boilerplate for TypeScript-based Node.js projects, powered by esbuild & turborepo.

- Uses [TypeScript](https://www.typescriptlang.org/) to write code, tests, and scripts.
- Uses [esbuild](https://esbuild.github.io/) to compile your TypeScript codebase, tests, and scripts.
- Uses [Turborepo](https://turborepo.org/) as a build system to run scripts from the package root.
- Uses [tsc CLI](https://www.typescriptlang.org/docs/handbook/compiler-options.html) to type-check the codebase without emitting the compiled files (since they're handled by esbuild). No need to keep [TypeScript's Project References](https://www.typescriptlang.org/docs/handbook/project-references.html) up-to-date.
- Uses [esbuild-runner](https://github.com/folke/esbuild-runner) to run scripts on the fly.
- Uses [Yarn workspaces](https://yarnpkg.com/features/workspaces) to make it easy to work within the monorepo.
- Uses a shareable [ESLint config](./packages/eslint-config) and [Jest config](./packages/jest-config) to provide an extensible linting and testing setup.
- Uses esbuild + [nodemon](https://github.com/remy/nodemon) to reload the server in development mode (even when workspace dependencies are changed).

## Workspaces structure

Tangerine monorepo includes five workspaces:

- `packages/is-even`: The simplest workspace — it doesn't depend on any other worskpace. It's a Node.js module that exposes an `isEven` function that tells if the input number is even. It includes a CLI script that invokes the function from your terminal, and a test file, both written in TypeScript. The CLI script runs using esbuild-runner, which uses esbuild to compile it on the fly.
- `package/is-odd`: Depends on `packages/is-even`. It's a Node.js module that exposes an `isOdd` function that tells if the input number is odd (by invoking `isEven` and checking if it's false). It includes a CLI script and a test file.
- `package/server`: Depends on both `packages/is-odd` and `packages/is-even`. It's a Node.js Express server that exposes two routes that invoke `isEven` and `isOdd`. It uses nodemon to reload the server in development mode.
- `packages/jest-config`: Shared Jest config that uses esbuild to compile your tests and your codebase.
- `packages/eslint-config`: Shared ESLint config.

All the workspaces use esbuild to compile the TypeScript codebase. Be it for building, testing, or running CLI scripts, the compilation is instantaneous compared to the native TypeScript compiler (you can quickly test the difference by temporarily swapping esbuild with tsc).

The tsc CLI is used only to type-check the codebase (without emitting the compiled files — since they're handled by esbuild). I expect people usually use the IDE integration to type-check the code anyway and explicitly invoke the tsc CLI only in specific use cases (such as pre-commit hooks).

Each workspace's package.json is pointing the `main` and `types` entry to `src/index.ts`. Which might look strange at first, given that it's uncompiled code... see ["You might not need TypeScript project references" on the Turborepo blog](https://turborepo.com/posts/you-might-not-need-typescript-project-references) for an explanation. This pattern has been working fine for my use cases so far (especially while using esbuild). Still, you might want to update these entries to suit your needs (e.g., when shipping packages to npm).

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
If you prefer Yarn 2+, switching to it is as easy as running `yarn set version berry` 👍.

### Why esbuild? Why not [swc](https://github.com/swc-project/swc)?

I love [swc](https://github.com/swc-project/swc), but I feel esbuild is still more "mature". I've also noticed that in some cases swc doesn't respect TypeScript's `compilerOptions`'s `paths`.

### Why Turborepo?

Turborepo is specifically built to support monorepos such as this one.  
To me, the major benefits of Turborepo are an fast developer experience (mostly because of caching) and its configurability.

### Why are you pointing the package.json's `main` and `types` entry to uncompiled code?

See ["You might not need TypeScript project references" on the Turborepo blog](https://turborepo.com/posts/you-might-not-need-typescript-project-references). This pattern has been working fine for my use cases so far (especially while using esbuild). Still, you might want to update these entries to suit your needs.


