import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { authService } from '../services/api/auth.service';
import { authStorage } from '../utils/auth';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (authStorage.isAuthenticated()) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError('');

      await authService.register(username, password);

      const loginResponse = await authService.login(username, password);
      authStorage.setAuth(loginResponse.access_token, loginResponse.user);

      navigate(ROUTES.DASHBOARD);
    } catch {
      setError('Не удалось зарегистрироваться. Возможно, пользователь уже существует.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-t from-slate-900 to-sky-900 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-gradient-to-t from-purple-200 via-blue-200 to-blue-100 p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold text-slate-800">Регистрация</h1>
        <p className="mb-6 text-sm text-slate-500">
          Создайте аккаунт для работы с системой анализа рынка МСБ
        </p>

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
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 text-slate-600"
              required
              minLength={3}
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
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 text-slate-600"
              required
              minLength={4}
            />
          </div>

          {error ? <p className="text-sm text-red-500">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-slate-800 px-4 py-3 font-medium text-white transition hover:bg-slate-700 disabled:opacity-60"
          >
            {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-500">
          Уже есть аккаунт?{' '}
          <button
            type="button"
            onClick={() => navigate(ROUTES.LOGIN)}
            className="font-medium text-blue-600 transition hover:text-blue-700"
          >
            Войти
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;