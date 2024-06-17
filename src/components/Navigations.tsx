import { NavLink } from 'react-router-dom';

const links = [
  { href: '/', name: 'Beranda' },
  { href: '/catalogue', name: 'Katalog' },
  { href: '/about', name: 'Tentang Kami' }
];

function Navigations() {
  return (
    <>
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.href}
          className={({ isActive }) =>
            isActive
              ? 'relative after:content-[""] after:absolute after:h-2 after:w-4/5 after:border-b-2 after:border-primary after:-bottom-1 after:right-0 font-bold'
              : 'opacity-90'
          }
        >
          {link.name}
        </NavLink>
      ))}
    </>
  );
}

export default Navigations;
