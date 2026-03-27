import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Database,
  Globe2,
  LineChart,
  MapPinned,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const stats = [
  { label: "Регионов", value: "20+", icon: MapPinned },
  { label: "Отраслей", value: "50+", icon: Building2 },
  { label: "Показателей", value: "100+", icon: BarChart3 },
  { label: "Обновлений", value: "24/7", icon: TrendingUp },
];

const features = [
  {
    title: "Интерактивный дашборд",
    description:
      "Ключевые метрики, графики и динамика показателей малого и среднего бизнеса в одном окне.",
    icon: LineChart,
  },
  {
    title: "Глубокая аналитика",
    description:
      "Сравнивайте регионы, отрасли и временные периоды, чтобы быстро находить закономерности.",
    icon: Globe2,
  },
  {
    title: "Удобная работа с данными",
    description:
      "Детальные таблицы, фильтры и сегментация позволяют углубляться в данные без перегрузки интерфейса.",
    icon: Database,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.01,
    transition: { type: "spring", stiffness: 240, damping: 18 },
  },
} as const;

const HomePage = () => {
  const text =
    "Это веб-приложение предназначено для анализа показателей малого и среднего бизнеса по регионам, отраслям и временным периодам.";

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_28%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.18),transparent_24%),linear-gradient(to_bottom,rgba(15,23,42,1),rgba(2,6,23,1))]" />

        <motion.div
          className="absolute left-[-80px] top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-60px] top-40 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        />

        <div className="mx-auto max-w-7xl px-6 pb-16 pt-8 md:px-10 lg:px-12">
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur">
                <BarChart3 className="h-5 w-5 text-cyan-300" />
              </div>
              <div>
                <p className="text-sm text-slate-300">MSB Insight</p>
                <p className="text-xs text-slate-500">Аналитическая платформа</p>
              </div>
            </div>

            <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
              <a href="#features" className="transition hover:text-white">
                Возможности
              </a>
              <a href="#analytics" className="transition hover:text-white">
                Аналитика
              </a>
              <a href="#stats" className="transition hover:text-white">
                Метрики
              </a>
            </nav>
          </motion.header>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              <motion.div
                variants={fadeUp}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 backdrop-blur"
              >
                <ShieldCheck className="h-4 w-4" />
                Платформа для анализа МСБ
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl font-bold leading-tight text-white md:text-6xl"
              >
                Анализируйте рынок малого и среднего бизнеса
                <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
                  быстро, наглядно и глубоко
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg"
              >
                {text.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.012, duration: 0.02 }}
                  >
                    {char}
                  </motion.span>
                ))}
                <motion.span
                  className="ml-1 inline-block text-cyan-300"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  |
                </motion.span>
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 font-medium text-slate-950 shadow-lg shadow-cyan-500/20 transition"
                >
                  Начать анализ
                  <ArrowRight className="h-4 w-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur transition hover:bg-white/10"
                >
                  Смотреть дашборд
                </motion.button>
              </motion.div>

              <motion.div
                id="stats"
                variants={stagger}
                className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
              >
                {stats.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      variants={fadeUp}
                      className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                    >
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-cyan-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-2xl font-semibold text-white">{item.value}</div>
                      <div className="mt-1 text-sm text-slate-400">{item.label}</div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="realtive rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-cyan-900/20 backdrop-blur-xl lg:-rotate-10 rotate-0">
                <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/80">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                    alt="Аналитический дашборд"
                    className="h-[240px] w-full object-cover"
                  />

                  <div className="grid gap-4 p-5 md:grid-cols-2">
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm text-slate-400">Рост МСБ</span>
                        <span className="text-sm text-emerald-300">+14.8%</span>
                      </div>
                      <div className="h-28 rounded-2xl bg-gradient-to-br from-cyan-400/20 via-sky-400/10 to-transparent p-3">
                        <div className="flex h-full items-end gap-2">
                          {[30, 46, 42, 60, 74, 80, 92].map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ duration: 0.8, delay: 0.6 + i * 0.08 }}
                              className="w-full rounded-t-xl bg-gradient-to-t from-cyan-400 to-sky-300"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm text-slate-400">Регионы-лидеры</span>
                        <span className="text-sm text-violet-300">12 стран</span>
                      </div>
                      <img
                        src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80"
                        alt="Карта и аналитика по регионам"
                        className="h-28 w-full rounded-2xl object-cover"
                      />
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="absolute -bottom-6 -left-6 hidden w-56 rounded-3xl border border-white/10 bg-slate-900/90 p-4 shadow-xl backdrop-blur lg:block"
                >
                  <div className="mb-2 text-sm text-slate-400">Индекс устойчивости</div>
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-semibold text-white">87%</span>
                    <span className="mb-1 text-sm text-emerald-300">+9.2%</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-cyan-300/80">
            Возможности платформы
          </p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Всё для мониторинга, сравнения и стратегического анализа
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="group"
              >
                <motion.div
                  variants={cardHover}
                  className="h-full rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-400/20 text-cyan-300 ring-1 ring-white/10">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="leading-7 text-slate-400">{feature.description}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <section id="analytics" className="mx-auto max-w-7xl px-6 pb-24 md:px-10 lg:px-12">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
              alt="Бизнес-аналитика и отчёты"
              className="h-[320px] w-full rounded-[1.5rem] object-cover"
            />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="max-w-2xl"
          >
            <motion.p variants={fadeUp} className="mb-3 text-sm uppercase tracking-[0.2em] text-violet-300/80">
              Data storytelling
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-semibold text-white md:text-4xl">
              Превращайте сырые показатели в понятные управленческие решения
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 leading-8 text-slate-400">
              Платформа помогает увидеть, где рынок растёт быстрее, какие отрасли требуют внимания и как меняются показатели во времени. Интерактивные визуализации и удобные сравнительные сценарии упрощают анализ даже большого массива данных.
            </motion.p>

            <motion.div variants={stagger} className="mt-8 space-y-4">
              {[
                "Сравнение по регионам и секторам экономики",
                "Фильтрация по годам, кварталам и выбранным показателям",
                "Быстрое выявление трендов, рисков и точек роста",
              ].map((item) => (
                <motion.div
                  key={item}
                  variants={fadeUp}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                >
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" />
                  <p className="text-slate-300">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
