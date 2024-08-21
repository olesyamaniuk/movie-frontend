import React from 'react';
import { Link } from 'react-router-dom';
import css from './Navbar.module.css'; // Import the CSS module

function Navbar() {
  return (
    <nav className={css.navbar}>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <Link to="/" className={css.navLink}>Home</Link>
        </li>
        <li className={css.navItem}>
          <Link to="/add-movie" className={css.navLink}>Add Movie</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
