const paths = {
  directories: {
    path: '/',
  },
  document: {
    path: '/directory/:directoryId/document/:id',
    to: (directoryId: string, id: string) =>
      `/directory/${encodeURIComponent(directoryId)}/document/${encodeURIComponent(id)}`,
  },
  directory: {
    path: '/directory/:id',
    to: (id: string) => `/directory/${encodeURIComponent(id)}`,
  },
};

export default paths;
