/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  'query Directories {\n  directories {\n    directoryId\n    name\n    archived\n  }\n}': typeof types.DirectoriesDocument;
  'query Directory($directoryId: ID!) {\n  directory(directoryId: $directoryId) {\n    directoryId\n    name\n    archived\n    directories {\n      directoryId\n      name\n      archived\n    }\n    documents {\n      documentId\n      archived\n      currentVersion {\n        documentVersionId\n        number\n        name\n        extension\n      }\n      versions {\n        documentVersionId\n        number\n        name\n        extension\n      }\n      metadataValues {\n        definition {\n          metadataDefinitionId\n          key\n          label\n          type\n        }\n        value\n      }\n    }\n  }\n}': typeof types.DirectoryDocument;
  'query rootDirectories {\n  rootDirectories {\n    directoryId\n    name\n    archived\n    directories {\n      directoryId\n      name\n      archived\n    }\n  }\n}': typeof types.RootDirectoriesDocument;
};
const documents: Documents = {
  'query Directories {\n  directories {\n    directoryId\n    name\n    archived\n  }\n}':
    types.DirectoriesDocument,
  'query Directory($directoryId: ID!) {\n  directory(directoryId: $directoryId) {\n    directoryId\n    name\n    archived\n    directories {\n      directoryId\n      name\n      archived\n    }\n    documents {\n      documentId\n      archived\n      currentVersion {\n        documentVersionId\n        number\n        name\n        extension\n      }\n      versions {\n        documentVersionId\n        number\n        name\n        extension\n      }\n      metadataValues {\n        definition {\n          metadataDefinitionId\n          key\n          label\n          type\n        }\n        value\n      }\n    }\n  }\n}':
    types.DirectoryDocument,
  'query rootDirectories {\n  rootDirectories {\n    directoryId\n    name\n    archived\n    directories {\n      directoryId\n      name\n      archived\n    }\n  }\n}':
    types.RootDirectoriesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query Directories {\n  directories {\n    directoryId\n    name\n    archived\n  }\n}'
): (typeof documents)['query Directories {\n  directories {\n    directoryId\n    name\n    archived\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query Directory($directoryId: ID!) {\n  directory(directoryId: $directoryId) {\n    directoryId\n    name\n    archived\n    directories {\n      directoryId\n      name\n      archived\n    }\n    documents {\n      documentId\n      archived\n      currentVersion {\n        documentVersionId\n        number\n        name\n        extension\n      }\n      versions {\n        documentVersionId\n        number\n        name\n        extension\n      }\n      metadataValues {\n        definition {\n          metadataDefinitionId\n          key\n          label\n          type\n        }\n        value\n      }\n    }\n  }\n}'
): (typeof documents)['query Directory($directoryId: ID!) {\n  directory(directoryId: $directoryId) {\n    directoryId\n    name\n    archived\n    directories {\n      directoryId\n      name\n      archived\n    }\n    documents {\n      documentId\n      archived\n      currentVersion {\n        documentVersionId\n        number\n        name\n        extension\n      }\n      versions {\n        documentVersionId\n        number\n        name\n        extension\n      }\n      metadataValues {\n        definition {\n          metadataDefinitionId\n          key\n          label\n          type\n        }\n        value\n      }\n    }\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query rootDirectories {\n  rootDirectories {\n    directoryId\n    name\n    archived\n    directories {\n      directoryId\n      name\n      archived\n    }\n  }\n}'
): (typeof documents)['query rootDirectories {\n  rootDirectories {\n    directoryId\n    name\n    archived\n    directories {\n      directoryId\n      name\n      archived\n    }\n  }\n}'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
