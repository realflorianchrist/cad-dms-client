# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## GraphQL over IPC

The renderer's `ApiProvider` uses `src/apiTransport.ts`. Preload exposes only
`window.api.graphql`, which invokes `api:graphql`. Main validates the sender and
request, then runs the shared HTTP transport. GraphQL envelopes are returned
unchanged; transport errors are serialized and reconstructed with their HTTP
status in the renderer.

The default endpoint is `http://localhost:8080/graphql`. Set
`CAD_DMS_GRAPHQL_URL` in the environment of the Electron main process to override
it. This does not change the web app's endpoint. Authentication headers, if needed,
should be configured in main. IPC request cancellation is not implemented yet;
the renderer does not forward AbortSignal through the bridge.
