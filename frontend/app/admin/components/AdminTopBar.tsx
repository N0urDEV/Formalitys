'use client';

interface AdminTopBarProps {
  setSidebarOpen: (open: boolean) => void;
  currentPath: string;
}

export function AdminTopBar({ setSidebarOpen, currentPath }: AdminTopBarProps) {
  const getPageTitle = (path: string) => {
    switch (path) {
      case '/admin':
        return 'Dashboard';
      case '/admin/dossiers':
        return 'Gestion des dossiers';
      case '/admin/users':
        return 'Gestion des utilisateurs';
      case '/admin/blog':
        return 'Gestion du blog';
      case '/admin/admins':
        return 'Gestion des administrateurs';
      case '/admin/settings':
        return 'Paramètres';
      default:
        return 'Administration';
    }
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h2 
              className="text-2xl font-bold text-[#00171f]"
              style={{ fontFamily: '"Gascogne Serial", serif' }}
            >
              {getPageTitle(currentPath)}
            </h2>
            
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span style={{ fontFamily: 'Satoshi, sans-serif' }}>Système actif</span>
          </div>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
