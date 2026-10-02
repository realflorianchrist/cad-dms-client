import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  hooks: { afterAllFileWrite: ['prettier --write'] },
  schema: 'src/schema.graphqls',
  documents: 'src/operations/**/*.graphql',
  generates: {
    'src/generated/': {
      preset: 'client',
      presetConfig: { fragmentMasking: false },
      config: {
        useTypeImports: true,
        // The schema does not specify the custom scalars' JSON representation.
        defaultScalarType: 'unknown',
      },
    },
  },
};

export default config;
