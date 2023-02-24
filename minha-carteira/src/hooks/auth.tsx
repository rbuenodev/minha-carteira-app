import React, { createContext, useState, useContext, ReactNode } from "react";

interface BaseLayoutProps {
  children?: ReactNode;
}
interface IAuthContext {
  logged: boolean;
  singIn(email: string, password: string): void;
  singOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<BaseLayoutProps> = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(() => {
    const isLogged = localStorage.getItem("@minha-carteira:logged");
    return !!isLogged;
  });

  const singIn = (email: string, password: string) => {
    if (email === "teste@email.com" && password === "123") {
      localStorage.setItem("@minha-carteira:logged", "true");
      setLogged(true);
    } else {
      alert("Senha ou usuário inválido!");
    }
  };

  const singOut = () => {
    localStorage.removeItem("@minha-carteira:logged");
    setLogged(false);
  };

  return (
    <AuthContext.Provider value={{ logged, singIn, singOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
