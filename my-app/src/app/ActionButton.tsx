import { useState } from "react";
import { usePetContext } from "./PetContext";

interface ActionButtonProps {
    label: string;
    color: string;
}

const actionToStatMap: { [key: string]: string } = {
    "Feed": "Hunger",
    "Play": "Happiness",
    "Sleep": "Sleep",
    "Clean": "Hygiene"
};

const actionToMessageMap: { [key: string]: string } = {
    "Feed": "You fed Tamagotchi!",
    "Play": "You played with Tamagotchi!",
    "Sleep": "You put Tamagotchi to bed!",
    "Clean": "You bathed Tamagotchi!"
};

export default function ActionButton({ label, color }: ActionButtonProps) {
    const { setStats, growUp, addToLogs } = usePetContext();
    const [feedCount, setFeedCount] = useState<number>(0);

    const handleClick = () => {        
        setStats((prevStats) => {
            const updatedStats = { ...prevStats };
            const key = actionToStatMap[label];
            updatedStats[key] = Math.min(100, updatedStats[key] + 10);
            return updatedStats;
        })

        if (label == "Feed") {
            if (feedCount == 4) {
                growUp();
                setFeedCount(0);
            } else {
                setFeedCount(prevCount => prevCount + 1);
            }
        }

        addToLogs(Date.now(), actionToMessageMap[label]);
    }

    return (
        <button className="flex items-center justify-center w-32 h-28 bg-gray-300 rounded-md" onClick={handleClick}>
            <h2 className={`${color} text-4xl`}>{ label }</h2>
        </button>
    );
}