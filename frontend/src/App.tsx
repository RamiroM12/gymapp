import { useState } from 'react';
import { ClientesPage } from './pages/ClientesPage';
import { NuevoClientePage } from './pages/NuevoClientePage';
import { TiposMembresiaPage } from './pages/TiposMembresiaPage';
import { MembresiasPage } from './pages/MembresiasPage';
import { PagosPage } from './pages/PagosPage';
import { ClienteDetallePage } from './pages/ClienteDetallePage';
import { Layout } from './components/Layout';

type SimplePage = 'clientes' | 'membresias' | 'tipos-membresia' | 'pagos' | 'nuevo-cliente';
type PageWithParams = { id: 'cliente-detalle'; clienteId: number };
type Page = SimplePage | PageWithParams;

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('clientes');

  const isSimplePage = (page: Page): page is SimplePage => {
    return typeof page === 'string';
  };

  const renderPage = () => {
    if (isSimplePage(currentPage)) {
      switch (currentPage) {
        case 'clientes':
          return <ClientesPage onSelectCliente={(id) => setCurrentPage({ id: 'cliente-detalle', clienteId: id })} />;
        case 'nuevo-cliente':
          return <NuevoClientePage />;
        case 'tipos-membresia':
          return <TiposMembresiaPage />;
        case 'membresias':
          return <MembresiasPage />;
        case 'pagos':
          return <PagosPage />;
        default:
          return <ClientesPage onSelectCliente={(id) => setCurrentPage({ id: 'cliente-detalle', clienteId: id })} />;
      }
    } else if (currentPage.id === 'cliente-detalle') {
      return <ClienteDetallePage clienteId={currentPage.clienteId} onBack={() => setCurrentPage('clientes')} />;
    }
    return <ClientesPage onSelectCliente={(id) => setCurrentPage({ id: 'cliente-detalle', clienteId: id })} />;
  };

  // Helper to get the current simple page for the Layout
  const getCurrentSimplePage = (): SimplePage => {
    if (isSimplePage(currentPage)) return currentPage;
    return 'clientes';
  };

  return (
    <Layout currentPage={getCurrentSimplePage()} onNavigate={(page) => setCurrentPage(page as SimplePage)}>
      {renderPage()}
    </Layout>
  );
}

export default App;
