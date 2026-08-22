import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { HomePage } from './pages/HomePage';
import { TextCheckPage } from './pages/TextCheckPage';
import { UrlCheckPage } from './pages/UrlCheckPage';
import { ImageCheckPage } from './pages/ImageCheckPage';
import { VerificationResultPage } from './pages/VerificationResultPage';
import { HistoryPage } from './pages/HistoryPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
export const App = () => {
    return (_jsx(Router, { children: _jsx(AppLayout, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/verify/text", element: _jsx(TextCheckPage, {}) }), _jsx(Route, { path: "/verify/url", element: _jsx(UrlCheckPage, {}) }), _jsx(Route, { path: "/verify/image", element: _jsx(ImageCheckPage, {}) }), _jsx(Route, { path: "/result/:verificationId", element: _jsx(VerificationResultPage, {}) }), _jsx(Route, { path: "/result", element: _jsx(VerificationResultPage, {}) }), _jsx(Route, { path: "/history", element: _jsx(HistoryPage, {}) }), _jsx(Route, { path: "/about", element: _jsx(AboutPage, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFoundPage, {}) })] }) }) }));
};
export default App;
