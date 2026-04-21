import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HomePage } from './features/home';
import { ParentDashboard, KidDashboard } from './features/dashboard';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/parent" element={<ParentDashboard />} />
          <Route path="/kid" element={<KidDashboard />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
