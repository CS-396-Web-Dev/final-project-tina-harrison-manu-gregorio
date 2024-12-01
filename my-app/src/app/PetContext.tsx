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
    growUp:  () => void;
    logs: string[];
    addToLogs:  (timestamp: number, message: string) => void;
}
  
const PetContext = createContext<Pet>({
    name: '',
    setName: () => {},
    stats : {},
    setStats: () => {},
    stageOfLife: '',
    growUp: () => {},
    logs: [],
    addToLogs: () => {}
});

export const usePetContext = () => useContext(PetContext);
  
export default function PetContextProvider({ children }: PetContextProviderProps) {
    const initialStats = {
        'Hunger': 100,
        'Happiness': 100,
        'Sleep': 100,
        'Hygiene': 100
    }

    const stagesOfLife = ['Baby', 'Child', 'Teen', 'Adult', 'Senior'];
    const growUp = () => {
        const index = stagesOfLife.indexOf(stageOfLife);
        if (index < stagesOfLife.length - 1) {
            setStageOfLife(stagesOfLife[index + 1]);
        }
    }

    const formatter = new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hourCycle: 'h23',
        timeZone: 'America/Chicago'
    });
    const addToLogs = (timestamp: number, message: string) => {
        const formattedDate = formatter.format(new Date(timestamp))
        setLogs(prevLogs => [...prevLogs, `${formattedDate} ${message}`]);
    }

    const [name, setName] = useState<string>('Tamagotchi');
    const [stats, setStats] = useState<{ [key: string]: number }>(initialStats);
    const [stageOfLife, setStageOfLife] = useState<string>('Baby');
    const [logs, setLogs] = useState<string[]>([]);

    return (
        <PetContext.Provider value={{ name, setName, stats, setStats, stageOfLife, growUp, logs, addToLogs }}>
            {children}
        </PetContext.Provider>
    );
}
  