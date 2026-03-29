import { NavLink } from 'react-router-dom';
import { menuItems } from '../../constants/menu';
import { authStorage } from '../../utils/auth';

interface SidebarProps {
  compact?: boolean;
}

const Sidebar = ({ compact = false }: SidebarProps) => {
  const currentUser = authStorage.getUser();

  const visibleMenuItems = menuItems.filter((item) => {
    if (item.path === '/admin' && currentUser?.role !== 'admin') {
      return false;
    }
    return true;
  });

  return (
    <aside
      className={`fixed left-0 top-0 z-20 h-screen border-r border-slate-800 bg-gradient-to-t from-slate-900 to-sky-900 rounded-r-2xl text-white transition-all duration-300 ${
        compact ? 'w-20' : 'w-64'
      }`}
    >
      <div
        className={`border-b border-purple-800 ${
          compact ? 'px-3 py-5 text-center' : 'px-6 py-5'
        }`}
      >
        {compact ? (
          <h2 className="text-xl font-bold">MSB</h2>
        ) : (
          <>
            <h2 className="text-xl font-bold">MSB Analytics</h2>
            <p className="mt-1 text-sm text-slate-400">
              Анализ рынка МСБ
            </p>
          </>
        )}
      </div>

      <nav className="flex flex-col gap-2 p-3">
        {visibleMenuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl transition ${
                  compact
                    ? 'justify-center px-3 py-3'
                    : 'px-4 py-3 text-sm font-medium'
                } ${
                  isActive
                    ? 'bg-sky-300 text-white'
                    : 'text-slate-300 hover:bg-sky-800 hover:text-white'
                }`
              }
            >
              <Icon size={20} />

              {!compact && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;