module.exports = {
  // Map workspaces to their source code so that Jest can resolve them correctly.
  moduleNameMapper: {
    "^@my-monorepo/(.*)$": "<rootDir>/../$1/src",
  },
  // Use esbuild to transpile TypeScript files on the fly.
  coverageReporters: ["text", "cobertura", "lcov", "html"],
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
  },
};
