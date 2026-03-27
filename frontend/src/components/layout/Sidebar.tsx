import { NavLink } from 'react-router-dom';
import { menuItems } from '../../constants/menu';

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-64 border-r border-slate-800 bg-slate-900 text-white">
      <div className="border-b border-slate-800 px-6 py-5">
        <h2 className="text-xl font-bold">MSB Analytics</h2>
        <p className="mt-1 text-sm text-slate-400">
          Анализ рынка малого и среднего бизнеса
        </p>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;