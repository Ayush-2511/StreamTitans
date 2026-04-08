import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import LandingFlow from './pages/LandingFlow';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ExploreLive from './pages/ExploreLive';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDark = () => setIsDark(!isDark);

  return (
    <Routes>
      <Route path="/" element={<Home isDark={isDark} toggleDark={toggleDark} />} />
      <Route path="/welcome" element={<LandingFlow onComplete={() => navigate('/')} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/live" element={<ExploreLive />} />
    </Routes>
  );
}
