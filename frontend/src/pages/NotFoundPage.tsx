import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-slate-800">404</h1>
      <p className="mb-6 text-lg text-slate-600">Страница не найдена</p>

      <Link
        to={ROUTES.HOME}
        className="rounded-lg bg-slate-800 px-5 py-3 text-white transition hover:bg-slate-700"
      >
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFoundPage;