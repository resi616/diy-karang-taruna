import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// Import Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CategoryTutorials from './pages/CategoryTutorials';
import TutorialDetail from './pages/TutorialDetail';

// Middleware
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to='/' replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* --- HALAMAN PUBLIK --- */}
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* --- HALAMAN PRIVAT (PROTECTED) --- */}
        {/* Dashboard Utama */}
        <Route
          path='/home'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Profil & Progress User */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Daftar Video Berdasarkan Kategori */}
        <Route
          path='/category/:categoryId'
          element={
            <ProtectedRoute>
              <CategoryTutorials />
            </ProtectedRoute>
          }
        />

        {/* Detail Video & Langkah-langkah */}
        <Route
          path='/detail/:id'
          element={
            <ProtectedRoute>
              <TutorialDetail />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  );
}

export default App;
