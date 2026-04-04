import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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

      <motion.div
        animate={{
          marginLeft: isHomePage ? 80 : 256,
        }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="min-h-screen"
      >
        {!isHomePage && <Header />}

        <main className={isHomePage ? 'p-0' : 'p-6'}>
          <div className={isHomePage ? '' : 'mx-auto max-w-7xl'}>
            {children}
          </div>
        </main>
      </motion.div>
    </div>
  );
};

export default MainLayout;