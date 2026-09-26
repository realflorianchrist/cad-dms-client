import { Route, Routes } from 'react-router';
import Document from './pages/Document';
import Home from './pages/Home';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/documents/:id" element={<Document />} />
    </Routes>
  );
}
