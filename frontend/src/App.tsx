import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';

import MainLayout from './components/layout/MainLayout';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import DataPage from './pages/DataPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />

        <Route
          path={ROUTES.DASHBOARD}
          element={
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          }
        />

        <Route
          path={ROUTES.ANALYTICS}
          element={
            <MainLayout>
              <AnalyticsPage />
            </MainLayout>
          }
        />

        <Route
          path={ROUTES.DATA}
          element={
            <MainLayout>
              <DataPage />
            </MainLayout>
          }
        />

        <Route
          path={ROUTES.ADMIN}
          element={
            <MainLayout>
              <AdminPage />
            </MainLayout>
          }
        />

        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;