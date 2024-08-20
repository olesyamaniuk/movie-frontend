// src/pages/EditMoviePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditMoviePage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://movie-backend-3.onrender.com/api/movies/${id}`)
      .then(response => setFormData(response.data.data))
      .catch(error => console.error('Error fetching movie:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Exclude restricted fields
    const { _id, createdAt, updatedAt, ...updateData } = formData;

    axios.put(`https://movie-backend-3.onrender.com/api/movies/${id}`, updateData)
      .then(() => navigate(`/movies/${id}`))
      .catch(error => {
        console.error('Error updating movie:', error.response ? error.response.data : error.message);
        alert(`Error: ${error.response ? error.response.data.message : error.message}`);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title || ''}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        type="text"
        name="director"
        value={formData.director || ''}
        onChange={handleChange}
        placeholder="Director"
        required
      />
      <input
        type="text"
        name="releaseYear"
        value={formData.releaseYear || ''}
        onChange={handleChange}
        placeholder="Release Year"
        required
      />
      
      <label>
        Favorite:
        <input
          type="checkbox"
          name="favorite"
          checked={formData.favorite || false}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update Movie</button>
    </form>
  );
}

export default EditMoviePage;
