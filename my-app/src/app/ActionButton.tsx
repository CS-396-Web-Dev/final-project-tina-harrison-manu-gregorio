import { useState } from "react";
import { usePetContext } from "./PetContext";

interface ActionButtonProps {
  label: string;
  color: string;
}

export default function ActionButton({ label, color }: ActionButtonProps) {
  const [cooldownMessage, setCooldownMessage] = useState<string | null>(null);
  const { name, setStats, growUp, addToLogs, triggerAction } = usePetContext();
  const [feedCount, setFeedCount] = useState<number>(0);

  const actionToStatMap: { [key: string]: string } = {
    Feed: "Hunger",
    Play: "Happiness",
    Sleep: "Sleep",
    Clean: "Hygiene",
  };

  const actionToMessageMap: { [key: string]: string } = {
    Feed: `You fed ${name}!`,
    Play: `You played with ${name}!`,
    Sleep: `You put ${name} to bed!`,
    Clean: `You bathed ${name}!`,
  };

  const handleClick = () => {
    const action = () => {
      setStats((prevStats) => {
        const updatedStats = { ...prevStats };
        const key = actionToStatMap[label];
        updatedStats[key] = Math.min(100, updatedStats[key] + 10);
        return updatedStats;
      });

      if (label == "Feed") {
        if (feedCount == 4) {
          growUp();
          setFeedCount(0);
        } else {
          setFeedCount((prevCount) => prevCount + 1);
        }
      }
    };

    const success = triggerAction(action, actionToMessageMap[label]);
    if (!success) {
      addToLogs(Date.now(), "Action is on cooldown. Please wait!");
      setTimeout(() => setCooldownMessage(null), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="flex items-center justify-center w-32 h-28 bg-gray-300 rounded-md"
        onClick={handleClick}
      >
        <h2 className={`${color} text-4xl`}>{label}</h2>
      </button>
      {cooldownMessage && (
        <p className="text-red-500 text-sm mt-2">{cooldownMessage}</p>
      )}
    </div>
  );
}
