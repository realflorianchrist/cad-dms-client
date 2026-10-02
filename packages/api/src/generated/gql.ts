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
  'query Directory($directoryId: ID!) {\n  directory(directoryId: $directoryId) {\n    directoryId\n    name\n    archived\n    directories {\n      directoryId\n      name\n    }\n  }\n}': typeof types.DirectoryDocument;
  'query Project($projectId: ID!) {\n  project(projectId: $projectId) {\n    projectId\n    name\n    archived\n    directories {\n      directoryId\n      name\n    }\n    documents {\n      documentId\n    }\n  }\n}': typeof types.ProjectDocument;
  'query Projects {\n  projects {\n    projectId\n    name\n    archived\n    directories {\n      directoryId\n      name\n    }\n    documents {\n      documentId\n    }\n  }\n}': typeof types.ProjectsDocument;
};
const documents: Documents = {
  'query Directory($directoryId: ID!) {\n  directory(directoryId: $directoryId) {\n    directoryId\n    name\n    archived\n    directories {\n      directoryId\n      name\n    }\n  }\n}':
    types.DirectoryDocument,
  'query Project($projectId: ID!) {\n  project(projectId: $projectId) {\n    projectId\n    name\n    archived\n    directories {\n      directoryId\n      name\n    }\n    documents {\n      documentId\n    }\n  }\n}':
    types.ProjectDocument,
  'query Projects {\n  projects {\n    projectId\n    name\n    archived\n    directories {\n      directoryId\n      name\n    }\n    documents {\n      documentId\n    }\n  }\n}':
    types.ProjectsDocument,
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
  source: 'query Directory($directoryId: ID!) {\n  directory(directoryId: $directoryId) {\n    directoryId\n    name\n    archived\n    directories {\n      directoryId\n      name\n    }\n  }\n}'
): (typeof documents)['query Directory($directoryId: ID!) {\n  directory(directoryId: $directoryId) {\n    directoryId\n    name\n    archived\n    directories {\n      directoryId\n      name\n    }\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query Project($projectId: ID!) {\n  project(projectId: $projectId) {\n    projectId\n    name\n    archived\n    directories {\n      directoryId\n      name\n    }\n    documents {\n      documentId\n    }\n  }\n}'
): (typeof documents)['query Project($projectId: ID!) {\n  project(projectId: $projectId) {\n    projectId\n    name\n    archived\n    directories {\n      directoryId\n      name\n    }\n    documents {\n      documentId\n    }\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query Projects {\n  projects {\n    projectId\n    name\n    archived\n    directories {\n      directoryId\n      name\n    }\n    documents {\n      documentId\n    }\n  }\n}'
): (typeof documents)['query Projects {\n  projects {\n    projectId\n    name\n    archived\n    directories {\n      directoryId\n      name\n    }\n    documents {\n      documentId\n    }\n  }\n}'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
