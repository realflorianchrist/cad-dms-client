import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  hooks: { afterAllFileWrite: ['prettier --write'] },
  schema: 'src/api/schema.graphqls',
  documents: 'src/api/operations/**/*.graphql',
  generates: {
    'src/api/generated/': {
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
