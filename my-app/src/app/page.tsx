import StatsSection from './StatsSection';
import ActionButtonSection from './ActionButtonSection';
import Log from './Log';
import { jersey20 } from './fonts/fonts';

export default function Home() {
  return (
    <div className="h-screen overflow-hidden mt-3 text-center">
      <h1 className={`${jersey20.className} text-4xl`}>Tamagotchi</h1>
      <div className="w-full h-px mt-3 bg-black"></div>
      <main className="flex h-full mt-8">
        <div className="w-1/4 h-5/6 ml-32 bg-sky-400 rounded-md"></div>
        <div className="flex flex-col flex-grow ml-16 mr-32">
          <StatsSection />
          <ActionButtonSection />
          <Log />
        </div>
      </main>
    </div>
  );
}
