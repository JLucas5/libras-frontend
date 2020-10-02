import React, { useEffect, useState } from "react";
import app from "./base.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const list = process.env.REACT_APP_ADMIN_EMAILS.split("|");
  const [currentUser, setCurrentUser] = useState(null);

  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  useEffect(() => {
    if (currentUser && !list.includes(currentUser.email)) {
      app.auth().signOut();
    }
  }, [currentUser]);

  if (pending) {
    return <>Carregando...</>;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
