const paths = {
  directories: {
    path: '/',
  },
  document: {
    path: '/directory/:directoryId/document/:documentId',
    to: (directoryId: string, documentId: string) =>
      `/directory/${encodeURIComponent(directoryId)}/document/${encodeURIComponent(documentId)}`,
  },
  directory: {
    path: '/directory/:directoryId',
    to: (directoryId: string) =>
      `/directory/${encodeURIComponent(directoryId)}`,
  },
};

export default paths;
