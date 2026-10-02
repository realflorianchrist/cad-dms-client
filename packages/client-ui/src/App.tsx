import { Route, Routes } from 'react-router';
import Directory from './components/pages/Directory';
import Layout from './components/pages/Layout';
import Document from './components/pages/Document';
import Directories from './components/pages/Directories';
import paths from './paths';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={paths.directories.path} element={<Directories />} />
        <Route path={paths.document.path} element={<Document />} />
        <Route path={paths.directory.path} element={<Directory />} />
      </Route>
    </Routes>
  );
}
