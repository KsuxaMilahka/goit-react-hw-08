import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import styles from './LoginForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { selectAuthError } from '../../redux/auth/selectors';

const LoginValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Пароль є обов'язковим")
    .min(8, 'Пароль має бути мінімум в 8 символів')
    .max(100, 'Пароль має бути меншим за 100 символів'),

  email: Yup.string()
    .email('Некоректна електронна адреса')
    .required("Електронна адреса є обов'язковим"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const INITIAL_VALUES = {
    email: '',
    password: '',
  };

  const handleSubmit = values => {
    dispatch(login(values));
  };
  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={LoginValidationSchema}
    >
      {({ errors }) => (
        <Form className={styles.form}>
          <label className={styles.label}>
            <span>Email:</span>
            <Field
              type="text"
              name="email"
              placeholder="oksana.sage2012@gmail.com"
            />
            <ErrorMessage
              className={styles.errorText}
              name="email"
              component="span"
            />
          </label>

          <label className={styles.label}>
            <span>Password</span>
            <Field
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            <ErrorMessage
              className={styles.errorText}
              name="password"
              component="span"
            />
          </label>

          <button
            disabled={Object.keys(errors).length > 0}
            className={styles.submitBtn}
            type="submit"
          >
            Log In
          </button>
          {error && (
            <p className={styles.errorText}>
              Oops, some error occured... {error}
            </p>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
