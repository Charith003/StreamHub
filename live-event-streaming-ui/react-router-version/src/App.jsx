import { Navigate, Route, Routes } from 'react-router-dom';
import EventPage from './pages/EventPage';

export default function App() {
  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
      <Routes>
        <Route path="/" element={<Navigate to="/event/1" replace />} />
        <Route path="/event/:id" element={<EventPage />} />
      </Routes>
    </>
  );
}
