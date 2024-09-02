import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import styles from './ContactForm.module.css';

const numberRegExp = /^[0-9]{3}-[0-9]{2}-[0-9]{2}$/;

const ContactValidationSchema = Yup.object().shape({
  contactName: Yup.string()
    .required("Ім'я профілю є обов'язковим")
    .min(3, "Ім'я профілю має бути мінімум в 3 символи")
    .max(50, "Ім'я профілю має бути меншим за 50 символів"),
  contactNumber: Yup.string()
    .matches(
      numberRegExp,
      "Номер телефону має співпадати з форматом 'xxx-xx-xx'",
    )
    .required("Номер телефону є обов'язковий"),
});

const INITIAL_VALUES = {
  contactName: '',
  contactNumber: '',
};

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const contactObject = {
      name: values.contactName,
      number: values.contactNumber,
    };

    dispatch(addContact(contactObject));

    actions.resetForm();
    actions.setStatus({});
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={ContactValidationSchema}
    >
      {() => (
        <Form className={styles.form}>
          <label className={styles.label}>
            <span>Name</span>
            <Field type="text" name="contactName" placeholder="" />
            <ErrorMessage
              className={styles.errorText}
              name="contactName"
              component="span"
            />
          </label>

          <label className={styles.label}>
            <span>Number</span>
            <Field type="tel" name="contactNumber" placeholder="" />
            <ErrorMessage
              className={styles.errorText}
              name="contactNumber"
              component="span"
            />
          </label>

          <button className={styles.submitBtn} type="submit">
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
