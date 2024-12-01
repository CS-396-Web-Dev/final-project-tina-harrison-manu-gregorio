import { usePetContext } from "./PetContext";

export default function LogSection() {
  const { logs } = usePetContext();

  return (
    <section className="bg-gray-900 rounded-md text-left text-white mt-5 lg:mt-10 p-3">
      <h2 className="text-2xl">Log</h2>
      <div className="mt-2">
        {logs.slice(-10).map((log, index) => (
          <p className="text-xl" key={index}>
            {log}
          </p>
        ))}
      </div>
    </section>
  );
}
