'use client'

import StatsSection from './StatsSection';
import ActionButtonSection from './ActionButtonSection';
import LogSection from './LogSection';
import { jersey20 } from './fonts/fonts';
import { usePetContext } from './PetContext';
import { useEffect } from 'react';
import Header from './Header';

export default function Home() {
  const { name, setStats, addToLogs } = usePetContext();

  const statToDescriptor: { [key: string]: string } = {
    'Hunger': 'hungry',
    'Happiness': 'sad',
    'Sleep': 'sleepy',
    'Hygiene': 'stinky'
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) => {
        const updatedStats = { ...prevStats };
        for (const key in updatedStats) {
          const randomDecrement = Math.floor(Math.random() * 3);
          const newStat = updatedStats[key] - randomDecrement;
          
          if (newStat <= 5) {
            addToLogs(Date.now(), `${name} is ${statToDescriptor[key]}!!!`);
          } else if (newStat <= 20) {
            addToLogs(Date.now(), `${name} is getting ${statToDescriptor[key]}...`);
          }

          updatedStats[key] = Math.max(0, newStat);
        }

        return updatedStats;
      });
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <div className={`${jersey20.className} h-screen mt-3 text-center lg:overflow-hidden`}>
      <Header />
      <main className="lg:flex lg:flex-row h-full mx-5 justify-center">
        <div className="lg:w-1/3 h-5/6 mt-5 bg-sky-400 rounded-md"></div>
        <div className="flex flex-col lg:ml-16">
          <StatsSection />
          <ActionButtonSection />
          <LogSection />
        </div>
      </main>
    </div>
  );
}
