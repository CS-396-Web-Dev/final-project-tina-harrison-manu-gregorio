import { jersey20 } from "./fonts/fonts";
import { usePetContext } from "./PetContext";
import Stat from "./Stat";

export default function StatsSection() {
    const { stats, stageOfLife } = usePetContext();

    return (
        <div className="h-1/6 text-left border border-black rounded-md">
            <h2 className={`${jersey20.className} text-2xl ml-3 mt-3`}>Quality Check</h2>
            <div className="flex space-x-4 gap-5 ml-3 mt-2">
                { Object.entries(stats).map(([key, value]) => <Stat key={key} label={key} value={value} /> ) }  
            </div>
            <div className="mt-2">
                <h3 className={`${jersey20.className} text-xl ml-3`}>Stage of Life: { stageOfLife }</h3>
            </div>
        </div>
    );
}