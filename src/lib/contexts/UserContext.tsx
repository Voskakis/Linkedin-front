import { createContext, useState, useContext, useEffect, ReactNode} from 'react';

interface User {
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  BioFileId: number | null;
  PhotoFileId: number | null;
}

interface UserContextType {
  user: User | null;
  signIn: (userData: User) => void;
  signOut: () => void;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('Use contexts within a provider');
  }
  return context;
}

export const UserProvider = ({children}: {children: ReactNode;}) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
}