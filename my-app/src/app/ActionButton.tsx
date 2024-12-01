import { jersey20 } from "./fonts/fonts";
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

export default function ActionButton({ label, color }: ActionButtonProps) {
    const { setStats } = usePetContext();

    const handleClick = () => {
        setStats((prevStats) => {
            const updatedStats = { ...prevStats };
            const key = actionToStatMap[label];
            updatedStats[key] = Math.min(100, updatedStats[key] + 10);
            return updatedStats;
        })
    }

    return (
        <button className="flex items-center justify-center w-32 h-28 bg-gray-300 rounded-md" onClick={handleClick}>
            <h2 className={`${jersey20.className} ${color} text-4xl`}>{ label }</h2>
        </button>
    );
}