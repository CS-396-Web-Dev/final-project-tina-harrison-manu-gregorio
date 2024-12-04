import { useState } from "react";
import { usePetContext } from "./PetContext";

interface ActionButtonProps {
  label: string;
  color: string;
}

export default function ActionButton({ label, color }: ActionButtonProps) {
  const { name, setStats, growUp, triggerAction } = usePetContext();
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

        // checks and balances
        if (key == "Hunger") { 
          updatedStats["Sleep"] -= 5;
        }
        if (key == "Happiness") { 
          updatedStats["Hygiene"] -= 5; 
          updatedStats["Sleep"] -= 5;
        }
        if (key == "Sleep") { 
          updatedStats["Hunger"] -= 2;
        }
        
        return updatedStats;
      });

      // stage of life
      if (label == "Feed") {
        if (feedCount == 4) {
          growUp();
          setFeedCount(0);
        } else {
          setFeedCount((prevCount) => prevCount + 1);
        }
      }
    };

    triggerAction(action, actionToMessageMap[label]);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="flex items-center justify-center w-32 h-28 bg-gray-300 rounded-md"
        onClick={handleClick}
      >
        <h2 className={`${color} text-4xl`}>{label}</h2>
      </button>
    </div>
  );
}
