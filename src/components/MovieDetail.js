import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import css from './MovieDetail.module.css'; // Імпортуйте CSS модулі

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://movie-backend-3.onrender.com/api/movies/${id}`)
      .then(response => setMovie(response.data.data))
      .catch(error => console.error('Error fetching movie:', error));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  const handleEdit = () => {
    navigate(`/movies/edit/${id}`);
  };

  return (
    <div className={css['movie-detail']}>
      <h1>Movie Details</h1>
      <p><strong>Title:</strong> {movie.title}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Release Year:</strong> {movie.releaseYear}</p>
      <p><strong>Status:</strong> {movie.favorite ? "Favorite" : "Not Favorite"}</p>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}

export default MovieDetail;

