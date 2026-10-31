import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { authApi } from "../api/authApi";
import { setUnauthorizedHandler, tokenStorage } from "../api/client";
import { useToast } from "./ToastContext";
import { isTokenExpired } from "../utils/jwt";
import { userStorage } from "../utils/userStorage";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const getInitialUser = () => {
  const token = tokenStorage.get();
  const user = userStorage.get();

  if (!token || !user || isTokenExpired(token)) {
    tokenStorage.clear();
    userStorage.clear();
    return null;
  }

  return user;
};

export const AuthProvider = ({ children }) => {
  const { showToast } = useToast();
  const [user, setUser] = useState(getInitialUser);

  const logout = useCallback(() => {
    tokenStorage.clear();
    userStorage.clear();
    setUser(null);
  }, []);

  const login = useCallback(async (email, password) => {
    const { token, user: loggedInUser } = await authApi.login(email, password);
    tokenStorage.set(token);
    userStorage.set(loggedInUser);
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const register = useCallback(
    async (email, password) => {
      await authApi.register(email, password);
      return login(email, password);
    },
    [login]
  );

  useEffect(() => {
    setUnauthorizedHandler(() => {
      logout();
      showToast("Session expired. Please log in again.", "error");
    });
    return () => setUnauthorizedHandler(null);
  }, [logout, showToast]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === "ADMIN",
      login,
      register,
      logout,
    }),
    [user, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};