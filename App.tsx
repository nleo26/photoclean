import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Prototype } from './pages/Prototype';
import { Summary } from './pages/Summary';

export function App({
  initialTab = 'tidy',
  showIntro = true,
  homeVariant = 'minimal'




}: {initialTab?: 'tidy' | 'find' | 'share';showIntro?: boolean;homeVariant?: 'minimal' | 'detailed';}) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Prototype initialTab={initialTab} showIntro={showIntro} homeVariant={homeVariant} />} />
        
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </BrowserRouter>);

}