import {
  Home,
  LayoutDashboard,
  BarChart3,
  Table,
  Settings,
  LogIn,
} from 'lucide-react';

import { ROUTES } from './routes';

export const menuItems = [
  { label: 'Главная', path: ROUTES.HOME, icon: Home },
  { label: 'Дашборд', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'Аналитика', path: ROUTES.ANALYTICS, icon: BarChart3 },
  { label: 'Данные', path: ROUTES.DATA, icon: Table },
  { label: 'Админ панель', path: ROUTES.ADMIN, icon: Settings },
  { label: 'Вход', path: ROUTES.LOGIN, icon: LogIn },
];