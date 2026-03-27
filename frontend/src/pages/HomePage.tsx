const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-4 text-4xl font-bold text-slate-800">
          Анализ и визуализация данных рынка малого и среднего бизнеса
        </h1>

        <p className="mb-6 text-lg text-slate-600">
          Это веб-приложение предназначено для анализа показателей малого и среднего
          бизнеса по регионам, отраслям и временным периодам.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow">
            <h2 className="mb-2 text-xl font-semibold text-slate-800">Дашборд</h2>
            <p className="text-slate-600">
              Просмотр ключевых метрик, графиков и общей статистики рынка МСБ.
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <h2 className="mb-2 text-xl font-semibold text-slate-800">Аналитика</h2>
            <p className="text-slate-600">
              Сравнение регионов, отраслей и динамики развития бизнеса.
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <h2 className="mb-2 text-xl font-semibold text-slate-800">Данные</h2>
            <p className="text-slate-600">
              Табличное представление информации для детального изучения.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;