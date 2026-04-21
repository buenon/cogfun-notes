import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ParentDashboard } from './features/dashboard/ParentDashboard';
import { KidDashboard } from './features/dashboard/KidDashboard';
import { User, Users } from 'lucide-react';
import { cn } from './lib/utils';
import { DICTIONARY } from './lib/dictionary';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  const navigate = (path: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">
      <AnimatePresence mode="wait">
        {currentPath === '/parent' && <ParentDashboard key="parentDashboard" />}
        {currentPath === '/kid' && <KidDashboard key="kidDashboard" />}
        
        {(currentPath === '/' || (currentPath !== '/parent' && currentPath !== '/kid')) && (
          <div key="home" className="flex flex-col items-center justify-center min-h-screen p-6 max-w-md mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-2">
                {DICTIONARY.app.title}
              </h1>
              <p className="text-slate-500 font-medium">{DICTIONARY.app.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 w-full">
              <a
                href="/parent"
                onClick={(e) => navigate('/parent', e)}
                className={cn(
                  "flex items-center justify-center p-8 rounded-3xl transition-all shadow-sm",
                  "bg-indigo-100 text-indigo-900 border-2 border-indigo-200 hover:bg-indigo-50 hover:shadow-md"
                )}
              >
                <Users size={32} className="me-4" />
                <div className="text-start">
                  <h2 className="text-2xl font-bold">{DICTIONARY.app.parentMode}</h2>
                  <p className="opacity-80 font-medium">{DICTIONARY.app.parentModeDesc}</p>
                </div>
              </a>

              <a
                href="/kid"
                onClick={(e) => navigate('/kid', e)}
                className={cn(
                  "flex items-center justify-center p-8 rounded-3xl transition-all shadow-sm",
                  "bg-orange-100 text-orange-900 border-2 border-orange-200 hover:bg-orange-50 hover:shadow-md"
                )}
              >
                <User size={32} className="me-4" />
                <div className="text-start">
                  <h2 className="text-2xl font-bold">{DICTIONARY.app.kidMode}</h2>
                  <p className="opacity-80 font-medium">{DICTIONARY.app.kidModeDesc}</p>
                </div>
              </a>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
