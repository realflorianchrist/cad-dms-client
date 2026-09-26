import { Route, Routes } from 'react-router';
import Document from './pages/Document';
import Home from './pages/Home';
import Layout from './pages/Layout';
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
