
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MovieForm({ initialData = {}, isEdit = false }) {
  const [formData, setFormData] = useState(initialData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEdit
      ? `https://movie-backend-3.onrender.com/api/movies/${formData._id}`
      : 'https://movie-backend-3.onrender.com/api/movies';

    const method = isEdit ? 'put' : 'post';

    axios[method](url, formData)
      .then(() => navigate('/'))
      .catch(error => console.error('Error saving movie:', error));
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
      <button type="submit">{isEdit ? 'Update Movie' : 'Add Movie'}</button>
    </form>
  );
}

export default MovieForm;

