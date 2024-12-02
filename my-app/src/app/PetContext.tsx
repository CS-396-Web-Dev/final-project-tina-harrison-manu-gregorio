"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface PetContextProviderProps {
  children: ReactNode;
}

interface Pet {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  stats: { [key: string]: number };
  setStats: Dispatch<SetStateAction<{ [key: string]: number }>>;
  stageOfLife: string;
  growUp: () => void;
  logs: string[];
  addToLogs: (timestamp: number, message: string) => void;
  resetPet: () => void;
  triggerPrompt: (urgency: "urgent" | "normal", message: string) => void;
  triggerAction: (action: () => void, message: string) => boolean;
}

const PetContext = createContext<Pet>({
  name: "",
  setName: () => {},
  stats: {},
  setStats: () => {},
  stageOfLife: "",
  growUp: () => {},
  logs: [],
  addToLogs: () => {},
  resetPet: () => {},
  triggerPrompt: () => {},
  triggerAction: () => false,
});

export const usePetContext = () => useContext(PetContext);

export default function PetContextProvider({
  children,
}: PetContextProviderProps) {
  const [lastPromptTime, setLastPromptTime] = useState<number | null>(null);
  const [lastActionTime, setLastActionTime] = useState<number | null>(null);

  const canPrompt = (urgency: "urgent" | "normal") => {
    const now = Date.now();
    const cooldown = urgency === "urgent" ? 2000 : 10000; // 2s for urgent, 10s for normal
    return !lastPromptTime || now - lastPromptTime >= cooldown;
  };

  const canAct = () => {
    const now = Date.now();
    const cooldown = 2000; // Example: 5s action cooldown
    return !lastActionTime || now - lastActionTime >= cooldown;
  };

  const triggerPrompt = (urgency: "urgent" | "normal", message: string) => {
    if (canPrompt(urgency)) {
      setLastPromptTime(Date.now());
      addToLogs(Date.now(), message);
    }
  };

  const triggerAction = (action: () => void, message: string): boolean => {
    if (canAct()) {
      setLastActionTime(Date.now());
      action();
      addToLogs(Date.now(), message);
      return true;
    }
    return false;
  };

  const initialStats = {
    Hunger: 100,
    Happiness: 100,
    Sleep: 100,
    Hygiene: 100,
  };

  const stagesOfLife = ["Baby", "Child", "Teen", "Adult", "Senior"];
  const growUp = () => {
    const index = stagesOfLife.indexOf(stageOfLife);
    if (index < stagesOfLife.length - 1) {
      const newStage = stagesOfLife[index + 1];
      setStageOfLife(newStage);
      addToLogs(Date.now(), `${name} is now a ${newStage.toLowerCase()}!`);
    }
  };

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "America/Chicago",
  });

  const addToLogs = (timestamp: number, message: string) => {
    const formattedDate = formatter.format(new Date(timestamp));
    setLogs((prevLogs) => {
      const updatedLogs = [...prevLogs, `${formattedDate} CST ${message}`];
      return updatedLogs;
    });
  };

  const resetPet = () => {
    setStats(initialStats);
    setStageOfLife("Baby");
    setLogs([]);
  };

  const [name, setName] = useState<string>("Tamagotchi");
  const [stats, setStats] = useState<{ [key: string]: number }>(initialStats);
  const [stageOfLife, setStageOfLife] = useState<string>("Baby");
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const savedName = localStorage.getItem("name");
    if (savedName) {
      setName(JSON.parse(savedName));
    }

    const savedStats = localStorage.getItem("stats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }

    const savedStageOfLife = localStorage.getItem("stageOfLife");
    if (savedStageOfLife) {
      setStageOfLife(JSON.parse(savedStageOfLife));
    }

    const savedLogs = localStorage.getItem("logs");
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("name", JSON.stringify(name));
    localStorage.setItem("stats", JSON.stringify(stats));
    localStorage.setItem("stageOfLife", JSON.stringify(stageOfLife));
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [name, stats, stageOfLife, logs]);

  return (
    <PetContext.Provider
      value={{
        name,
        setName,
        stats,
        setStats,
        stageOfLife,
        growUp,
        logs,
        addToLogs,
        resetPet,
        triggerPrompt,
        triggerAction,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
