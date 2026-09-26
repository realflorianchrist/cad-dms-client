import { Route, Routes } from 'react-router';
import Document from './components/pages/Document';
import Home from './components/pages/Home';
import Layout from './components/pages/Layout';
import paths from './paths';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={paths.home.path} element={<Home />} />
        <Route path={paths.documents.path} element={<Document />} />
      </Route>
    </Routes>
  );
}
