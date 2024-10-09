import { Suspense } from 'react';
import css from './Layout.module.css';
/* import Loader from '../Loader/Loader'; */
import Navbar from '../Navbar/Navbar';

export default function Layout({ children }) {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <Navbar />
      </header>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  );
}