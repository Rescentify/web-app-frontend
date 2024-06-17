import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <>
      <NavLink to="/">Beranda</NavLink>
      <NavLink to="#">Katalog</NavLink>
      <NavLink to="#">Tentang Kami</NavLink>
    </>
  );
}

export default Navigation;
