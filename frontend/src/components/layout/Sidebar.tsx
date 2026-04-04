import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems } from '../../constants/menu';
import { authStorage } from '../../utils/auth';

interface SidebarProps {
  compact?: boolean;
}

const Sidebar = ({ compact = false }: SidebarProps) => {
  const user = authStorage.getUser();

  const filteredMenu = menuItems.filter((item) => {
    if (item.path === '/admin' && user?.role !== 'admin') {
      return false;
    }
    return true;
  });

  return (
    <motion.aside
      animate={{
        width: compact ? 80 : 256,
      }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="fixed left-0 top-0 z-20 h-screen overflow-hidden border-r border-slate-800 bg-gradient-to-t from-slate-900 to-sky-900 rounded-r-2xl text-white"
    >
      <div className={`border-b border-slate-800 ${compact ? 'px-3 py-5' : 'px-6 py-5'}`}>
        <AnimatePresence mode="wait">
          {compact ? (
            <motion.h2
              key="compact-logo"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="text-center text-xl font-bold"
            >
              MSB
            </motion.h2>
          ) : (
            <motion.div
              key="full-logo"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-bold">MSB Analytics</h2>
              <p className="mt-1 text-sm text-slate-300">
                Анализ рынка МСБ
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex flex-col gap-2 p-3">
        {filteredMenu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={item.label}
              className={({ isActive }) =>
                `flex items-center rounded-xl transition ${
                  compact ? 'justify-center px-3 py-3' : 'gap-3 px-4 py-3'
                } ${
                  isActive
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Icon size={20} className="shrink-0" />

              <AnimatePresence>
                {!compact && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-nowrap text-sm font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;