import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { authService } from '../services/api/auth.service';
import { authStorage } from '../utils/auth';

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (authStorage.isAuthenticated()) {
      navigate(ROUTES.DASHBOARD);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError('');

      const response = await authService.login(username, password);
      authStorage.setAuth(response.access_token, response.user);

      navigate(ROUTES.DASHBOARD);
    } catch {
      setError('Неверный логин или пароль');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-t from-slate-900 to-sky-900 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-gradient-to-t from-sky-200 via-blue-100 to-purple-100 p-8 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">Вход в систему</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите username"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-500 text-slate-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-500 text-slate-600"
            />
          </div>

          {error ? <p className="text-sm text-red-500">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-slate-800 px-4 py-3 font-medium text-white transition hover:bg-slate-700 disabled:opacity-60"
          >
            {isSubmitting ? 'Вход...' : 'Войти'}
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-500">
          Нет аккаунта?{' '}
          <button
            type="button"
            onClick={() => navigate(ROUTES.REGISTER)}
            className="font-medium text-blue-600 transition hover:text-blue-700"
          >
            Зарегистрироваться
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;