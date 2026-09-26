# shadcn/ui monorepo template

This is a Vite monorepo template with shadcn/ui.

## Shared configuration

`tsconfig.json` contains shared TypeScript compiler settings. Browser and UI
projects extend `tsconfig.react.json`, which adds JSX and DOM types. Each app
keeps its own paths, included files, and separate browser/Node projects.

`eslint.config.mjs` contains shared lint rules. The package-level ESLint configs
re-export it. React rules and browser globals apply to `src`, while Electron
and build configuration files use Node globals. ESLint dependencies live in
the root package.

Run `pnpm lint` and `pnpm typecheck` from the repository root to check all
packages. Changes to shared configs invalidate Turbo's cached checks.

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from '@workspace/ui/components/button';
```
