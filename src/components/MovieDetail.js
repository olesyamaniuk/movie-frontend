
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    <div className="movie-detail">
      <h1>{movie.title}</h1>
      <p>{movie.director}</p>
      <p>{movie.releaseYear}</p>
      <p>{movie.favorite ? "Favorite" : "Not Favorite"}</p>
      <p>{movie.description}</p>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}

export default MovieDetail;
