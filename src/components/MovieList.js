import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('https://movie-backend-3.onrender.com/api/movies')
      .then(response => {
        // Переконайтеся, що response.data.data є масивом
        if (Array.isArray(response.data.data)) {
          setMovies(response.data.data);
        } else {
          console.error('Expected an array but got', response.data.data);
          setMovies([]); // встановлює порожній масив, якщо дані не відповідають очікуваній структурі
        }
      })
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <div key={movie._id} className="movie-card">
          <h2>{movie.title}</h2>
          <p>{movie.director}</p>
          <Link to={`/movies/${movie._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
