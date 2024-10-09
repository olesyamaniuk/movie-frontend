 
import { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

const HomePage = lazy(() => import('./components/HomePage/HomePage.js'));
const MoviePage = lazy(() => import('./pages/MoviePage.js'));
const AddMoviePage = lazy(() => import('./pages/AddMoviePage.js'));
const EditMoviePage = lazy(() => import('./pages/EditMoviePage.js'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.js'));
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
  //   <Layout>
  //   <Routes>
  //     <Route path="/" element={<HomePage />} />
  //   </Routes>
  // </Layout>


  );
}

export default App;