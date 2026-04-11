import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Layout() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-orange-500" : "hover:text-orange-500 transition-colors";
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-orange-500 p-2 rounded-lg text-white">
                <Plane className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight">Budget Traveler</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 font-medium text-sm text-slate-600">
              <Link to="/destinations" className={isActive('/destinations')}>Kierunki</Link>
              <Link to="/tips" className={isActive('/tips')}>Porady Społeczności</Link>
              <Link to="/guides" className={isActive('/guides')}>Przewodniki</Link>
              <Link to="/share">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6">
                  Dodaj Poradę
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-1.5 rounded-md text-white">
              <Plane className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">Budget Traveler</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-500">
            <Link to="/about" className="hover:text-slate-900 transition-colors">O nas</Link>
            <Link to="#" className="hover:text-slate-900 transition-colors">Zasady</Link>
            <Link to="#" className="hover:text-slate-900 transition-colors">Prywatność</Link>
            <Link to="#" className="hover:text-slate-900 transition-colors">Regulamin</Link>
          </div>
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Budget Traveler. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </div>
  );
}
