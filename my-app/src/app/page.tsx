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
      <main className="lg:flex lg:flex-row h-full mx-5 justify-center">
        <div className="lg:w-1/3 h-5/6 mt-5 bg-sky-400 rounded-md relative">
          <div className="ground w-full h-16 bg-green-500 absolute bottom-0"></div>
          <div className="scene sky w-full h-full">
            <div className="cloud absolute bg-white rounded-full h-12 w-32 top-10 left-40 animate-clouds"></div>
            <div className="cloud absolute bg-white rounded-full h-12 w-48 top-20 left-36 animate-clouds"></div>
            <div className="cloud absolute bg-white rounded-full h-12 w-32 top-48 left-72 animate-clouds"></div>
            <div className="cloud absolute bg-white rounded-full h-12 w-48 top-56 left-64 animate-clouds"></div>

            <div className="tamagotchi absolute bottom-5 left-1/2 transform -translate-x-1/2">
              <img
                src="/tamagotchi.png"
                alt="Tamagotchi"
                className="w-12 h-12"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:ml-16">
          <StatsSection />
          <ActionButtonSection />
          <LogSection />
        </div>
      </main>
    </div>
  );
}
