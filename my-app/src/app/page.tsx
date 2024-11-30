import { Jersey_20 } from 'next/font/google';

const jersey20 = Jersey_20({
  subsets: ['latin'],
  weight: '400'
});

export default function Home() {
  return (
    <div className="flex justify-center mt-3">
      <h1 className={`${jersey20.className} text-4xl`}>Tamagotchi</h1>
    </div>
  );
}
