import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import css from './EditMovie.module.css';
import { MovieSchema } from '../../Validation/movieFormValidation';

function EditMovie() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://movie-backend-3.onrender.com/api/movies/${id}`)
      .then(response => setInitialData(response.data.data))
      .catch(error => console.error('Error fetching movie:', error));
  }, [id]);

  const handleSubmit = () => {
    // const { createdAt, updatedAt, ...updateData } = values;

    axios.put(`https://movie-backend-3.onrender.com/api/movies/${id}`)
      .then(() => navigate(`/movies/${id}`))
      .catch(error => {
        console.error('Error updating movie:', error.response ? error.response.data : error.message);
        alert(`Error: ${error.response ? error.response.data.message : error.message}`);
      });
  };

  return (
    <div className={css['form-container']}>
      <h1>Edit Movie</h1>
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
              <ErrorMessage name="title" component="div" />
            </div>
            <div>
              <label htmlFor="director">Director</label>
              <Field type="text" name="director" placeholder="Director" />
              <ErrorMessage name="director" component="div" />
            </div>
            <div>
              <label htmlFor="releaseYear">Release Year</label>
              <Field type="text" name="releaseYear" placeholder="Release Year" />
              <ErrorMessage name="releaseYear" component="div" />
            </div>
            <div>
              <label htmlFor="favorite">Favorite</label>
              <Field type="checkbox" name="favorite" />
            </div>
            <button type="submit" disabled={isSubmitting}>Update Movie</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditMovie;
