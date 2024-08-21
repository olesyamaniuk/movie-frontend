// // src/pages/EditMoviePage.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// function EditMoviePage() {
//   const { id } = useParams();
//   const [formData, setFormData] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`https://movie-backend-3.onrender.com/api/movies/${id}`)
//       .then(response => setFormData(response.data.data))
//       .catch(error => console.error('Error fetching movie:', error));
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Exclude restricted fields
//     const { _id, createdAt, updatedAt, ...updateData } = formData;

//     axios.put(`https://movie-backend-3.onrender.com/api/movies/${id}`, updateData)
//       .then(() => navigate(`/movies/${id}`))
//       .catch(error => {
//         console.error('Error updating movie:', error.response ? error.response.data : error.message);
//         alert(`Error: ${error.response ? error.response.data.message : error.message}`);
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="title"
//         value={formData.title || ''}
//         onChange={handleChange}
//         placeholder="Title"
//         required
//       />
//       <input
//         type="text"
//         name="director"
//         value={formData.director || ''}
//         onChange={handleChange}
//         placeholder="Director"
//         required
//       />
//       <input
//         type="text"
//         name="releaseYear"
//         value={formData.releaseYear || ''}
//         onChange={handleChange}
//         placeholder="Release Year"
//         required
//       />
      
//       <label>
//         Favorite:
//         <input
//           type="checkbox"
//           name="favorite"
//           checked={formData.favorite || false}
//           onChange={handleChange}
//         />
//       </label>
//       <button type="submit">Update Movie</button>
//     </form>
//   );
// }

// export default EditMoviePage;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Yup validation schema
const MovieSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Min 3 characters!!!')
    .max(50, 'Max 50 characters!!!')
    .required('Is required!!!'),
  director: Yup.string()
    .min(3, 'Min 3 characters!!!')
    .max(50, 'Max 50 characters!!!')
    .required('Is required!!!'),
  releaseYear: Yup.number()
    .min(4, 'Min 4 characters!!!')
    .typeError('Release Year must be a number')
    .required('Is required!!!'),
});

function EditMoviePage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://movie-backend-3.onrender.com/api/movies/${id}`)
      .then(response => setInitialData(response.data.data))
      .catch(error => console.error('Error fetching movie:', error));
  }, [id]);

  const handleSubmit = (values) => {
    const { _id, createdAt, updatedAt, ...updateData } = values;

    axios.put(`https://movie-backend-3.onrender.com/api/movies/${id}`, updateData)
      .then(() => navigate(`/movies/${id}`))
      .catch(error => {
        console.error('Error updating movie:', error.response ? error.response.data : error.message);
        alert(`Error: ${error.response ? error.response.data.message : error.message}`);
      });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialData}
      validationSchema={MovieSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <Field type="text" name="title" placeholder="Title" />
            <ErrorMessage name="title" component="div" style={{ color: 'red' }} />
          </div>
          <div>
            <label htmlFor="director">Director</label>
            <Field type="text" name="director" placeholder="Director" />
            <ErrorMessage name="director" component="div" style={{ color: 'red' }} />
          </div>
          <div>
            <label htmlFor="releaseYear">Release Year</label>
            <Field type="text" name="releaseYear" placeholder="Release Year" />
            <ErrorMessage name="releaseYear" component="div" style={{ color: 'red' }} />
          </div>
          <div>
            <label htmlFor="favorite">Favorite</label>
            <Field type="checkbox" name="favorite" />
          </div>
          <button type="submit" disabled={isSubmitting}>Update Movie</button>
        </Form>
      )}
    </Formik>
  );
}

export default EditMoviePage;
