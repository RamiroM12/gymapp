import { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  Tag, 
  DollarSign, 
  UserPlus, 
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

type Page = 'clientes' | 'membresias' | 'tipos-membresia' | 'pagos' | 'nuevo-cliente';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { id: Page; label: string; icon: React.ElementType }[] = [
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'membresias', label: 'Membresías', icon: CreditCard },
  { id: 'tipos-membresia', label: 'Tipos', icon: Tag },
  { id: 'pagos', label: 'Pagos', icon: DollarSign },
  { id: 'nuevo-cliente', label: 'Nuevo', icon: UserPlus },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg transition-all duration-200"
        style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          color: 'var(--text-primary)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar backdrop for mobile */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-30 bg-black/50 transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          flex flex-col
          transition-all duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${collapsed ? 'lg:w-20' : 'lg:w-64'}
          w-64
        `}
        style={{ 
          backgroundColor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
          {!collapsed && (
            <h1 className="text-xl font-bold transition-opacity duration-200" style={{ color: 'var(--accent)' }}>
              GymApp
            </h1>
          )}
          {collapsed && (
            <span className="text-xl font-bold mx-auto" style={{ color: 'var(--accent)' }}>G</span>
          )}
          <button
            className="hidden lg:block p-1.5 rounded-lg transition-colors hover:bg-[var(--bg-tertiary)]"
            style={{ color: 'var(--text-secondary)' }}
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-all duration-200
                  ${isActive 
                    ? 'font-medium shadow-sm' 
                    : 'hover:bg-[var(--bg-tertiary)]'
                  }
                `}
                style={{
                  backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                  color: isActive ? 'white' : 'var(--text-secondary)',
                }}
              >
                <Icon size={20} className="flex-shrink-0" />
                {!collapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer with theme toggle */}
        <div className="p-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <button
            onClick={toggleTheme}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
              transition-all duration-200
              hover:bg-[var(--bg-tertiary)]
            `}
            style={{ color: 'var(--text-secondary)' }}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            {!collapsed && (
              <span>{theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
