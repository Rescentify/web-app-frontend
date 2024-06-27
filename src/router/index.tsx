import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import ComingSoon from '../pages/ComingSoon';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'catalogue',
        element: <ComingSoon pageContent="Products" />
      },
      {
        path: 'about',
        element: <ComingSoon pageContent="About Us" />
      }
    ]
  }
]);

export default router;
