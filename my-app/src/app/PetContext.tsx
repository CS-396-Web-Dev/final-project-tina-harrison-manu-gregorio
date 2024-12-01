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
            const newStage = stagesOfLife[index + 1]
            setStageOfLife(newStage);
            addToLogs(Date.now(), `${name} is now a ${newStage.toLowerCase()}!`)
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
        setLogs(prevLogs => {
            const updatedLogs = [...prevLogs, `${formattedDate} CST ${message}`];
            localStorage.setItem('logs', JSON.stringify(updatedLogs));
            return updatedLogs
        });
    }

    const [name, setName] = useState<string>('Tamagotchi');
    const [stats, setStats] = useState<{ [key: string]: number }>(() => {
        const savedStats = localStorage.getItem('stats');
        return savedStats ? JSON.parse(savedStats) : initialStats;
    });
    const [stageOfLife, setStageOfLife] = useState<string>('Baby');
    const [logs, setLogs] = useState<string[]>(() => {
        const savedLogs = localStorage.getItem('logs');
        return savedLogs ? JSON.parse(savedLogs) : [];
    });

    return (
        <PetContext.Provider value={{ name, setName, stats, setStats, stageOfLife, growUp, logs, addToLogs }}>
            {children}
        </PetContext.Provider>
    );
}
  