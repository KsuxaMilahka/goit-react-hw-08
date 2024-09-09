import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import styles from './RegistrationForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { selectAuthError } from '../../redux/auth/selectors';

const RegistrationValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Ім'я користувача є обов'язковим")
    .min(2, "Ім'я користувача має бути мінімум в 2 символи")
    .max(100, "Ім'я користувача має бути меншим за 100 символів"),
  password: Yup.string()
    .required("Пароль є обов'язковим")
    .min(8, 'Пароль має бути мінімум в 8 символів')
    .max(100, 'Пароль має бути меншим за 100 символів'),
  email: Yup.string()
    .email('Некоректна електронна адреса')
    .required("Електронна адреса є обов'язковим"),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const INITIAL_VALUES = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={RegistrationValidationSchema}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <label className={styles.label}>
            <span>Name:</span>
            <Field type="text" name="name" placeholder="Oksana" />
            <ErrorMessage
              className={styles.errorText}
              name="name"
              component="span"
            />
          </label>
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
            disabled={
              Object.keys(errors).length > 0 || !Object.keys(touched).length
            }
            className={styles.submitBtn}
            type="submit"
          >
            Register
          </button>
          {error && (
            <p className={styles.errorText}>
              Oops, some error occurred... {error.message || error}
            </p>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
