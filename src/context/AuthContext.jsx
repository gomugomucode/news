import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Mock server user record database
const MOCK_STAFF_USER = {
  id: "editor-77",
  name: "Editor Jane",
  email: "editor@newsportal.com",
  role: "editor"
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Lifecycle check: Check for an active saved login session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('news_portal_session');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Session profile parsed with corruption errors:", e);
        localStorage.removeItem('news_portal_session');
      }
    }
    setAuthLoading(false);
  }, []);

  // Login handler: Simulates network verification latency against credentials
  const login = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Network latency lag

    if (email === "editor@newsportal.com" && password === "password123") {
      setUser(MOCK_STAFF_USER);
      localStorage.setItem('news_portal_session', JSON.stringify(MOCK_STAFF_USER));
      return { success: true };
    }
    throw new Error("Invalid staff identification email or credentials provided.");
  };

  // Logout handler: Flushes credentials out of local storage state trees
  const logout = () => {
    setUser(null);
    localStorage.removeItem('news_portal_session');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authLoading, isEditor: user?.role === 'editor' }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access authentication contexts swiftly
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be mounted securely inside an active AuthProvider container.");
  }
  return context;
}
