import { Jersey_20 } from 'next/font/google';

const jersey20 = Jersey_20({
  subsets: ['latin'],
  weight: '400'
});

export default function Home() {
  return (
    <div className="text-center mt-3 h-screen">
      <h1 className={`${jersey20.className} text-4xl`}>Tamagotchi</h1>
      <div className="h-px w-full bg-black mt-3"></div>
      <div className="h-5/6 w-1/4 bg-sky-400 mt-8 ml-28 rounded-md"></div>
    </div>
  );
}
