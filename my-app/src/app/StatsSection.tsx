import { usePetContext } from "./PetContext";
import Stat from "./Stat";

export default function StatsSection() {
    const { stats, stageOfLife } = usePetContext();

    return (
        <section className="mt-5 text-left border border-black rounded-md p-3">
            <h2 className="text-2xl">Quality Check</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4">
                { Object.entries(stats).map(([key, value]) => <Stat key={key} label={key} value={value} /> ) }  
            </div>
            <h3 className="text-xl">Stage of Life: { stageOfLife }</h3>
        </section>
    );
}