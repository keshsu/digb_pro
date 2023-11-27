import React, { useState, createContext, useEffect, ReactNode } from "react";
import useAuthListener from "utils/use-auth-listener";

interface AuthContextProps {
  isTokenValidated: boolean;
  userToken: string | null; // Assuming userToken is a string, update the type accordingly
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  isTokenValidated: false,
  userToken: null,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { userToken } = useAuthListener();
  const [isTokenValidated, setIsTokenValidated] = useState(false);

  useEffect(() => {
    if (userToken) {
      setIsTokenValidated(true);
    } else {
      setIsTokenValidated(false);
    }
  }, [userToken]);

  return (
    <AuthContext.Provider value={{ isTokenValidated, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};
