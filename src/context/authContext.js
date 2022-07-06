import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { auth } from "../firebase/Firebase";

export const authContext = createContext()

export const useAuth = () => {
  const context = useContext(authContext);
  return context
}

export function AuthProvider ({children}){

  const [user, setUser] = useState(null)

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => signOut(auth)

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    })
  }, []);

  return(
    <authContext.Provider value={{login, logout, user}}>
      {children}
    </authContext.Provider>
  )
}