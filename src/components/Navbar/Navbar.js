import React from 'react';
import { Link } from 'react-router-dom';
import css from './Navbar.module.css';

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

// import { NavLink } from 'react-router-dom';
// import clsx from 'clsx';
// import css from './Navbar.module.css';

// const NavigationClass = ({ isActive }) => {
//   return clsx(css.link, isActive && css.active);
// };

// export default function Navbar() {
//   return (
//     <div className={css.container}>
//       <nav className={css.nav}>
//         <NavLink to="/" className={NavigationClass}>
//           Home
//         </NavLink>
//         <NavLink to="/add-movie" className={NavigationClass}>
//         Add Movie
//         </NavLink>
//       </nav>
//     </div>
//   );
// }
