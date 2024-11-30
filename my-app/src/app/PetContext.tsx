"use client"

import { createContext, ReactNode, useContext, useState, Dispatch } from 'react';
  
interface PetContextProviderProps {
  children: ReactNode;
}

interface Pet {
  name: string;
  setName: Dispatch<any>
  stats: { [key: string]: string };
  setStats:  Dispatch<any>;
}
  
const PetContext = createContext<Pet>({
  name: '',
  setName: () => {},
  stats : {},
  setStats: () => {},
});

export const usePetContext = () => useContext(PetContext);
  
export default function PetContextProvider({ children }: PetContextProviderProps) {
  const [name, setName] = useState<string>('Tamagotchi');
  const [stats, setStats] = useState({});

  return (
    <PetContext.Provider value={{ name, setName, stats, setStats }}>
      {children}
    </PetContext.Provider>
  );
}
  