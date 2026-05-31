import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const MOCK_USER = {
  id: 'editor-jane',
  name: 'Editor Jane',
  email: 'editor@newsportal.com',
  role: 'editor'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const savedSession = localStorage.getItem('news_portal_session');
    if (savedSession) {
      try {
        setUser(JSON.parse(savedSession));
      } catch (e) {
        localStorage.removeItem('news_portal_session');
      }
    }
    setAuthLoading(false);
  }, []);

  const login = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    if (email === 'editor@newsportal.com' && password === 'password123') {
      setUser(MOCK_USER);
      localStorage.setItem('news_portal_session', JSON.stringify(MOCK_USER));
      return { success: true };
    }
    throw new Error('Invalid email or password credentials.');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('news_portal_session');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading: authLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be mounted within AuthProvider');
  return context;
}
