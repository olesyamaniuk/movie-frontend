import * as Yup from 'yup';

export const MovieSchema = Yup.object().shape({
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