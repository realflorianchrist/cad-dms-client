const paths = {
  projects: {
    path: '/',
  },
  project: {
    path: '/project/:id',
    to: (id: string) => `/project/${encodeURIComponent(id)}`,
  },
  directory: {
    path: '/directory/:id',
    to: (id: string) => `/directory/${encodeURIComponent(id)}`,
  },
};

export default paths;
