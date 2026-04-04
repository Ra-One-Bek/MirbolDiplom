import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { authStorage } from '../../utils/auth';
import { motion } from 'framer-motion';

const pageMap: Record<string, { title: string; subtitle: string }> = {
  [ROUTES.HOME]: {
    title: 'Главная',
    subtitle: 'Описание системы и ее назначения.',
  },
  [ROUTES.DASHBOARD]: {
    title: 'Dashboard',
    subtitle: 'Ключевые показатели и основная статистика рынка МСБ.',
  },
  [ROUTES.ANALYTICS]: {
    title: 'Аналитика',
    subtitle: 'Сравнение регионов, отраслей и динамики развития.',
  },
  [ROUTES.DATA]: {
    title: 'Данные',
    subtitle: 'Табличное представление рыночных показателей.',
  },
  [ROUTES.ADMIN]: {
    title: 'Админ панель',
    subtitle: 'Управление данными рынка малого и среднего бизнеса.',
  },
  [ROUTES.LOGIN]: {
    title: 'Вход',
    subtitle: 'Авторизация пользователя.',
  },
};

const Header = () => {
  const location = useLocation();
  const user = authStorage.getUser();

  const currentPage = pageMap[location.pathname] ?? {
    title: 'Страница',
    subtitle: 'Раздел системы.',
  };

  return (
    <motion.header 
    initial={{opacity:0, y:-50}}
    animate={{opacity:1, y:0}}
    transition={{duration: 0.5, ease: "easeInOut"}}
    className="sticky top-0 z-15 bg-slate-900 px-6 py-4 backdrop-blur">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sky-200">
            {currentPage.title}
          </h1>
          <p className="text-sm text-slate-500">{currentPage.subtitle}</p>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="text-sm text-slate-600">
              👤 {user.username} ({user.role})
            </div>
          )}

          {user && (
            <button
              onClick={() => authStorage.logout()}
              className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-white hover:bg-slate-700"
            >
              Выйти
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;