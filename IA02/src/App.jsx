import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import PhotoList from './components/PhotoList';
import PhotoDetail from './components/PhotoDetail';

/**
 * Main App component with routing configuration
 */
function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/photos" replace />} />
            <Route path="/photos" element={<PhotoList />} />
            <Route path="/photos/:id" element={<PhotoDetail />} />
            <Route path="*" element={<Navigate to="/photos" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
