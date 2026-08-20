import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { TextCheckPage } from './pages/TextCheckPage';
import { UrlCheckPage } from './pages/UrlCheckPage';
import { ImageCheckPage } from './pages/ImageCheckPage';
import { VerificationResultPage } from './pages/VerificationResultPage';
import { HistoryPage } from './pages/HistoryPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/verify/text" element={<TextCheckPage />} />
          <Route path="/verify/url" element={<UrlCheckPage />} />
          <Route path="/verify/image" element={<ImageCheckPage />} />
          <Route path="/result/:verificationId" element={<VerificationResultPage />} />
          <Route path="/result" element={<VerificationResultPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
