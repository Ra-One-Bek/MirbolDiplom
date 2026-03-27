import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { ROUTES } from '../../constants/routes';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === ROUTES.HOME;

  return (
    <div className="min-h-screen">
      <Sidebar compact={isHomePage} />

      <div
        className={`min-h-screen transition-all duration-300 ${
          isHomePage ? 'ml-20' : 'ml-64'
        }`}
      >
        {!isHomePage && <Header />}

        <main className={isHomePage ? 'p-0' : 'p-6'}>
          <div className={isHomePage ? '' : 'mx-auto max-w-7xl'}>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;