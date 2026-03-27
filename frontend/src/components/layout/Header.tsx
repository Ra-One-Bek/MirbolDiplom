import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const pageMap: Record<string, { title: string; subtitle: string }> = {
  [ROUTES.HOME]: {
    title: 'Главная',
    subtitle: 'Описание системы и ее назначения.',
  },
  [ROUTES.DASHBOARD]: {
    title: 'Дашборд',
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

  const currentPage = pageMap[location.pathname] ?? {
    title: 'Страница',
    subtitle: 'Раздел системы.',
  };

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {currentPage.title}
          </h1>
          <p className="text-sm text-slate-500">{currentPage.subtitle}</p>
        </div>

        <div className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-600">
          Diploma Project • React + TypeScript + NestJS
        </div>
      </div>
    </header>
  );
};

export default Header;