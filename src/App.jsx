import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import { fetchContacts } from './redux/contacts/operations';
import { apiRefreshUser } from './redux/auth/operations';
import {
  selectAuthIsLoggedIn,
  selectAuthIsRefreshing,
} from './redux/auth/selectors';

import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import Layout from './components/Layout/Layout';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(() =>
  import('./pages/RegistrationPage/RegistrationPage'),
);

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const isRefreshing = useSelector(selectAuthIsRefreshing);

  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <>
      <Layout />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          {isLoggedIn && <Route path="/contacts" element={<ContactsPage />} />}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
