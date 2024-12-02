"use client";

import StatsSection from "./StatsSection";
import ActionButtonSection from "./ActionButtonSection";
import LogSection from "./LogSection";
import { jersey20 } from "./fonts/fonts";
import { usePetContext } from "./PetContext";
import { useEffect } from "react";
import Header from "./Header";

export default function Home() {
  const { name, setStats, triggerPrompt } = usePetContext();

  const statToDescriptor: { [key: string]: string } = {
    Hunger: "hungry",
    Happiness: "sad",
    Sleep: "sleepy",
    Hygiene: "stinky",
  };
  
  let petDescriptor = "";
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) => {
        const updatedStats = { ...prevStats };
        for (const key in updatedStats) {
          const randomDecrement = Math.floor(Math.random() * 3);
          const newStat = updatedStats[key] - randomDecrement;

          if (newStat <= 5) {
            triggerPrompt("urgent", `${name} is ${statToDescriptor[key]}!!!`);
          } else if (newStat <= 20) {
            triggerPrompt(
              "normal",
              `${name} is getting ${statToDescriptor[key]}...`
            );
            petDescriptor = statToDescriptor[key];
          }

          updatedStats[key] = Math.max(0, newStat);
        }

        return updatedStats;
      });
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <div
      className={`${jersey20.className} h-screen mt-3 text-center lg:overflow-hidden`}
    >
      <Header />
      <main>
        <Screen petDescriptor={petDescriptor} />
        <div className="flex flex-col lg:ml-16">
          <StatsSection />
          <ActionButtonSection />
          <LogSection />
        </div>
      </main>
    </div>
  );
}
