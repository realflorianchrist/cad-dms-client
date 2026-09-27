import { Route, Routes } from 'react-router';
import Directory from './components/pages/Directory';
import Layout from './components/pages/Layout';
import Project from './components/pages/Project';
import Projects from './components/pages/Projects';
import paths from './paths';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={paths.projects.path} element={<Projects />} />
        <Route path={paths.project.path} element={<Project />} />
        <Route path={paths.directory.path} element={<Directory />} />
      </Route>
    </Routes>
  );
}
