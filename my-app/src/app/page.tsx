"use client";

import StatsSection from "./StatsSection";
import ActionButtonSection from "./ActionButtonSection";
import LogSection from "./LogSection";
import ScreenSection from "./ScreenSection";
import { jersey20 } from "./fonts/fonts";
import { usePetContext } from "./PetContext";
import { useEffect, useState, useMemo } from "react";
import Header from "./Header";

export default function Home() {
  const { name, stats, setStats, triggerPrompt } = usePetContext();
  const [petDescriptor, setPetDescriptor] = useState<string>("");

  const statToDescriptor = useMemo(() => {
    return {
      Hunger: "hungry",
      Happiness: "sad",
      Sleep: "sleepy",
      Hygiene: "stinky",
    };
  }, []);
  type StatKey = keyof typeof statToDescriptor;

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) => {
        const updatedStats = { ...prevStats };
        for (const key in updatedStats) {
          const randomDecrement = Math.floor(Math.random() * 3);
          const newStat = updatedStats[key] - randomDecrement;

          if (newStat <= 20) {
            triggerPrompt(
              "urgent",
              `${name} is ${statToDescriptor[key as StatKey]}!!!`
            );
          } else if (newStat <= 40) {
            triggerPrompt(
              "normal",
              `${name} is getting ${statToDescriptor[key as StatKey]}...`
            );
          }

          updatedStats[key] = Math.max(0, newStat);
        }

        return updatedStats;
      });
    }, 5000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const descriptors = Object.keys(stats)
      .filter((key) => stats[key as StatKey] <= 40)
      .map((key) => statToDescriptor[key as StatKey]);

    const newDescriptor =
      descriptors.find(
        (_, index) => stats[Object.keys(stats)[index] as StatKey] <= 20
      ) ||
      descriptors[0] ||
      "normal";

    setPetDescriptor(newDescriptor);
  }, [stats, statToDescriptor]);

  return (
    <div
      className={`${jersey20.className} h-screen mt-3 text-center lg:overflow-hidden`}
    >
      <Header />
      <main className="lg:flex lg:flex-row h-full mx-5 justify-center">
        <ScreenSection petDescriptor={petDescriptor} />
        <div className="flex flex-col lg:ml-16">
          <StatsSection />
          <ActionButtonSection />
          <LogSection />
        </div>
      </main>
    </div>
  );
}
