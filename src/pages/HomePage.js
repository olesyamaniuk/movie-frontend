
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { updateMovie, deleteMovie } from '../services/movieService'; // Import your service functions

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://movie-backend-3.onrender.com/api/movies')
      .then(response => {
        console.log('API response:', response.data);
        if (response.data?.data?.items && Array.isArray(response.data.data.items)) {
          setMovies(response.data.data.items);
          setFilteredMovies(response.data.data.items); // Set initial filtered movies
        } else {
          console.error('Expected an array but got', response.data.data?.items);
          setMovies([]);
          setFilteredMovies([]);
        }
      })
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  // useCallback helps ensure filterMovies isn't recreated on every render
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
      // Update the movie's favorite status
      await updateMovie(movieId, { favorite: !currentFavoriteStatus });
      
      // Update the local state
      setMovies(movies.map(movie =>
        movie._id === movieId ? { ...movie, favorite: !currentFavoriteStatus } : movie
      ));
      // Update the filtered list as well
      setFilteredMovies(filteredMovies.map(movie =>
        movie._id === movieId ? { ...movie, favorite: !currentFavoriteStatus } : movie
      ));
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  const handleDelete = async (movieId) => {
    try {
      // Delete the movie
      await deleteMovie(movieId);
      
      // Update the local state
      setMovies(movies.filter(movie => movie._id !== movieId));
      // Update the filtered list as well
      setFilteredMovies(filteredMovies.filter(movie => movie._id !== movieId));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="home-page">
      <h1>Movie List</h1>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search by title"
        style={{ marginBottom: '10px' }}
      />
      {Array.isArray(filteredMovies) && filteredMovies.length > 0 ? (
        <ul>
          {filteredMovies.map(movie => (
            <li key={movie._id}>
              <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
              <button
                onClick={() => handleFavoriteToggle(movie._id, movie.favorite)}
                style={{ marginLeft: '10px' }}
              >
                {movie.favorite ? 'Unfavorite' : 'Favorite'}
              </button>
              <button
                onClick={() => handleDelete(movie._id)}
                style={{ marginLeft: '10px', color: 'red' }}
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
