

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';

// const MovieSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, 'Min 3 characters!!!')
//     .max(50, 'Max 50 characters!!!')
//     .required('Is required!!!'),
//   director: Yup.string()
//     .min(3, 'Min 3 characters!!!')
//     .max(50, 'Max 50 characters!!!')
//     .required('Is required!!!'),
//   releaseYear: Yup.number()
//     .min(4, 'Min 4 characters!!!')
//     .typeError('Release Year must be a number')
//     .required('Is required!!!'),
// });

// function MovieForm({ initialData = {}, isEdit = false }) {
//   const navigate = useNavigate();

//   const handleSubmit = (values) => {
//     const url = isEdit
//       ? `https://movie-backend-3.onrender.com/api/movies/${values._id}`
//       : 'https://movie-backend-3.onrender.com/api/movies';

//     const method = isEdit ? 'put' : 'post';

//     axios[method](url, values)
//       .then(() => navigate('/'))
//       .catch(error => console.error('Error saving movie:', error));
//   };

//   return (
//     <Formik
//       initialValues={initialData}
//       validationSchema={MovieSchema}
//       onSubmit={handleSubmit}
//     >
//       {({ isSubmitting }) => (
//         <Form>
//           <div>
//             <label htmlFor="title">Title</label>
//             <Field type="text" name="title" placeholder="Title" />
//             <ErrorMessage name="title" component="div" style={{ color: 'red' }} />
//           </div>
//           <div>
//             <label htmlFor="director">Director</label>
//             <Field type="text" name="director" placeholder="Director" />
//             <ErrorMessage name="director" component="div" style={{ color: 'red' }} />
//           </div>
//           <div>
//             <label htmlFor="releaseYear">Release Year</label>
//             <Field type="text" name="releaseYear" placeholder="Release Year" />
//             <ErrorMessage name="releaseYear" component="div" style={{ color: 'red' }} />
//           </div>
//           <div>
//             <label htmlFor="favorite">Favorite</label>
//             <Field type="checkbox" name="favorite" />
//           </div>
//           <button type="submit" disabled={isSubmitting}>
//             {isEdit ? 'Update Movie' : 'Add Movie'}
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// }

// export default MovieForm;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import css from './MovieForm.module.css'; // Імпортуйте CSS модулі

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

function MovieForm({ initialData = {}, isEdit = false }) {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const url = isEdit
      ? `https://movie-backend-3.onrender.com/api/movies/${values._id}`
      : 'https://movie-backend-3.onrender.com/api/movies';

    const method = isEdit ? 'put' : 'post';

    axios[method](url, values)
      .then(() => navigate('/'))
      .catch(error => console.error('Error saving movie:', error));
  };

  return (
    <div className={css['form-container']}>
      <Formik
        initialValues={initialData}
        validationSchema={MovieSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="title">Title</label>
              <Field type="text" name="title" placeholder="Title" />
              <ErrorMessage name="title" component="div" className={css['error-message']} />
            </div>
            <div>
              <label htmlFor="director">Director</label>
              <Field type="text" name="director" placeholder="Director" />
              <ErrorMessage name="director" component="div" className={css['error-message']} />
            </div>
            <div>
              <label htmlFor="releaseYear">Release Year</label>
              <Field type="text" name="releaseYear" placeholder="Release Year" />
              <ErrorMessage name="releaseYear" component="div" className={css['error-message']} />
            </div>
            <div>
              <label htmlFor="favorite">Favorite</label>
              <Field type="checkbox" name="favorite" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isEdit ? 'Update Movie' : 'Add Movie'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default MovieForm;


