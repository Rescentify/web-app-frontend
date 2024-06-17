import { NavLink } from 'react-router-dom';

const links = [
  { href: '/', name: 'Beranda' },
  { href: '#', name: 'Katalog' },
  { href: '#', name: 'Tentang Kami' }
];

function Navigation() {
  return (
    <>
      {links.map((link) => (
        <NavLink to={link.href}>{link.name}</NavLink>
      ))}
    </>
  );
}

export default Navigation;
