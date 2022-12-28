import { createContext } from "react";

interface IAuthContext {
  isAuth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  setAuth: () => {},
  isLoading: true,
});
