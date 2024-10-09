import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { updateMovie, deleteMovie } from '../../services/movieService';
import css from './HomePage.module.css'; 

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://movie-backend-3.onrender.com/api/movies')
      .then(response => {
        if (response.data?.data?.items && Array.isArray(response.data.data.items)) {
          setMovies(response.data.data.items);
          setFilteredMovies(response.data.data.items);
        } else {
          setMovies([]);
          setFilteredMovies([]);
        }
      })
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const filterMovies = useCallback(() => {
    const lowercasedSearch = search.toLowerCase();
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(lowercasedSearch)
    );
    setFilteredMovies(filtered);
  }, [search, movies]);

  useEffect(() => {
    filterMovies();
  }, [filterMovies]);

  const handleFavoriteToggle = async (movieId, currentFavoriteStatus) => {
    try {
      await updateMovie(movieId, { favorite: !currentFavoriteStatus });
      setMovies(movies.map(movie =>
        movie._id === movieId ? { ...movie, favorite: !currentFavoriteStatus } : movie
      ));
      setFilteredMovies(filteredMovies.map(movie =>
        movie._id === movieId ? { ...movie, favorite: !currentFavoriteStatus } : movie
      ));
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  const handleDelete = async (movieId) => {
    try {
      await deleteMovie(movieId);
      setMovies(movies.filter(movie => movie._id !== movieId));
      setFilteredMovies(filteredMovies.filter(movie => movie._id !== movieId));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={css.homePage}>
      <h1 className={css.header}>Movies List</h1>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search by title"
        className={css.searchInput}
      />
      {Array.isArray(filteredMovies) && filteredMovies.length > 0 ? (
        <ul className={css.movieList}>
          {filteredMovies.map(movie => (
            <li key={movie._id} className={css.movieItem}>
              <button
                onClick={() => handleFavoriteToggle(movie._id, movie.favorite)}
                className={css.favoriteButton}
              >
                {movie.favorite ? 'Favorite' : 'NotFavorite'}
              </button>
              <Link to={`/movies/${movie._id}`} className={css.movieTitle}>
                {movie.title}
              </Link>
              <button
                onClick={() => handleDelete(movie._id)}
                className={css.deleteButton}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
}

export default HomePage;

