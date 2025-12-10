import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<div>Test cheout page</div>} />
    </Routes>
  )
}

export default App
