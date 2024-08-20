import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import AddMoviePage from './pages/AddMoviePage';
import Navbar from './components/Navbar';
import NotFoundPage from './pages/NotFoundPage';
import EditMoviePage from './pages/EditMoviePage'; // Import the new page

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/add-movie" element={<AddMoviePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/movies/edit/:id" element={<EditMoviePage />} /> {/* New route */}
      </Routes>
    </Router>
  );
}

export default App;






