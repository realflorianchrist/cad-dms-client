const paths = {
  home: {
    path: '/',
  },
  documents: {
    path: '/documents/:id',
    to: (id: string) => `/documents/${encodeURIComponent(id)}`,
  },
};

export default paths;
