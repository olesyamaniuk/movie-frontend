import axios from 'axios';

const API_URL = 'https://movie-backend-3.onrender.com/api/movies';

export const getAllMovies = () => axios.get(API_URL);

export const getMovieById = (id) => axios.get(`${API_URL}/${id}`);

export const addMovie = (movie) => axios.post(API_URL, movie);

// export const updateMovie = (id, movie) => axios.put(`${API_URL}/${id}`, movie);
export const updateMovie = (id, movie) => axios.patch(`${API_URL}/${id}`, movie);

// export const deleteMovie = (id) => axios.delete(`${API_URL}/${id}`);
export const deleteMovie = (id) => axios.delete(`${API_URL}/${id}`);
