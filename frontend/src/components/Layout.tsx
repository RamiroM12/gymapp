import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

type Page = 'clientes' | 'membresias' | 'tipos-membresia' | 'pagos' | 'nuevo-cliente';

interface LayoutProps {
  children: ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  return (
    <div 
      className="min-h-screen flex transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <main 
        className="flex-1 p-4 lg:p-6 overflow-auto transition-all duration-300"
        style={{ color: 'var(--text-primary)' }}
      >
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
