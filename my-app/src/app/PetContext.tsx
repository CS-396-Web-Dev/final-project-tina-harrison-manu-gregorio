"use client"

import { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction } from 'react';
  
interface PetContextProviderProps {
  children: ReactNode;
}

interface Pet {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  stats: { [key: string]: number };
  setStats:  Dispatch<SetStateAction<{ [key: string]: number }>>;
  stageOfLife: string;
  setStageOfLife: Dispatch<SetStateAction<string>>;
}
  
const PetContext = createContext<Pet>({
  name: '',
  setName: () => {},
  stats : {},
  setStats: () => {},
  stageOfLife: '',
  setStageOfLife: () => {}
});

export const usePetContext = () => useContext(PetContext);
  
export default function PetContextProvider({ children }: PetContextProviderProps) {
  const initialStats = {
    'Hunger': 100,
    'Happiness': 100,
    'Sleep': 100,
    'Hygiene': 100
  }

  const [name, setName] = useState<string>('Tamagotchi');
  const [stats, setStats] = useState<{ [key: string]: number }>(initialStats);
  const [stageOfLife, setStageOfLife] = useState<string>('Baby');

  return (
    <PetContext.Provider value={{ name, setName, stats, setStats, stageOfLife, setStageOfLife }}>
      {children}
    </PetContext.Provider>
  );
}
  