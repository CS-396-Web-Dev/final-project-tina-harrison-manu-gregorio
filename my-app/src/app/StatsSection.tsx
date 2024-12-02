import { usePetContext } from "./PetContext";
import Stat from "./Stat";

export default function StatsSection() {
  const { stats, stageOfLife } = usePetContext();

  return (
    <section className="mt-5 text-left border border-white rounded-md p-5 text-white bg-black">
      <h2 className="text-2xl mb-4">Quality Check</h2>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(stats).map(([key, value]) => (
          <Stat key={key} label={key} value={value} />
        ))}
      </div>
      <h3 className="text-2xl mt-4">Stage of Life: {stageOfLife}</h3>
    </section>
  );
}
