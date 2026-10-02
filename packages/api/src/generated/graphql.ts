/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type MetadataType = 'BOOLEAN' | 'DATE' | 'ENUM' | 'NUMBER' | 'TEXT';

export type DirectoriesQueryVariables = Exact<{ [key: string]: never }>;

export type DirectoriesQuery = {
  directories: Array<{ directoryId: string; name: string; archived: boolean }>;
};

export type DirectoryQueryVariables = Exact<{
  directoryId: string | number;
}>;

export type DirectoryQuery = {
  directory: {
    directoryId: string;
    name: string;
    archived: boolean;
    directories: Array<{
      directoryId: string;
      name: string;
      archived: boolean;
    }>;
    documents: Array<{
      documentId: string;
      archived: boolean;
      currentVersion: {
        documentVersionId: string;
        number: number;
        name: string;
        extension: string;
      };
      versions: Array<{
        documentVersionId: string;
        number: number;
        name: string;
        extension: string;
      }>;
      metadataValues: Array<{
        value: string;
        definition: {
          metadataDefinitionId: string;
          key: string;
          label: string;
          type: MetadataType;
        };
      }>;
    }>;
  } | null;
};

export type RootDirectoriesQueryVariables = Exact<{ [key: string]: never }>;

export type RootDirectoriesQuery = {
  rootDirectories: Array<{
    directoryId: string;
    name: string;
    archived: boolean;
    directories: Array<{
      directoryId: string;
      name: string;
      archived: boolean;
    }>;
  }>;
};

export const DirectoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Directories' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'directories' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'directoryId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'archived' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DirectoriesQuery, DirectoriesQueryVariables>;
export const DirectoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Directory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'directoryId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'directory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'directoryId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'directoryId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'directoryId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'archived' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'directories' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'directoryId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'archived' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'documents' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documentId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'archived' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currentVersion' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'documentVersionId',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'number' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'extension' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'versions' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'documentVersionId',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'number' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'extension' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'metadataValues' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'definition' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'metadataDefinitionId',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'key' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'label' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'type' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DirectoryQuery, DirectoryQueryVariables>;
export const RootDirectoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'rootDirectories' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'rootDirectories' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'directoryId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'archived' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'directories' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'directoryId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'archived' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RootDirectoriesQuery,
  RootDirectoriesQueryVariables
>;
