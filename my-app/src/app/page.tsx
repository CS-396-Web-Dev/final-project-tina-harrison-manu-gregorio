"use client"

import StatsSection from './StatsSection';
import ActionButtonSection from './ActionButtonSection';
import LogSection from './LogSection';
import { jersey20 } from './fonts/fonts';
import { usePetContext } from './PetContext';
import { useEffect } from 'react';

export default function Home() {
  const { name, setStats } = usePetContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) => {
        const updatedStats = { ...prevStats };
        for (const key in updatedStats) {
          const randomDecrement = Math.floor(Math.random() * 4);
          updatedStats[key] = Math.max(0, updatedStats[key] - randomDecrement);
        }
        return updatedStats;
      });
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <div className="h-screen overflow-hidden mt-3 text-center">
      <h1 className={`${jersey20.className} text-4xl`}>{ name }</h1>
      <div className="w-full h-px mt-3 bg-black"></div>
      <main className="flex h-full mt-8 justify-center">
        <div className="w-1/4 h-5/6 bg-sky-400 rounded-md"></div>
        <div className="flex flex-col ml-16">
          <StatsSection />
          <ActionButtonSection />
          <LogSection />
        </div>
      </main>
    </div>
  );
}
