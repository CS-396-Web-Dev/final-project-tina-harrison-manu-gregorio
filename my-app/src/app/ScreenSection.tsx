interface ScreenProps {
  petDescriptor: string;
}

export default function ScreenSection({ petDescriptor }: ScreenProps) {
  let petImageSource = "/normal-cat.png";

  if (
    petDescriptor == "stinky" ||
    petDescriptor == "sad" ||
    petDescriptor == "sleepy"
  ) {
    petImageSource = "/" + petDescriptor + "-cat.png";
  }

  return (
    <div className="lg:w-1/3 h-5/6 mt-5 bg-sky-400 rounded-md relative">
      <div className="ground w-full h-16 bg-green-500 absolute bottom-0 rounded-md"></div>
      <div className="scene sky w-full h-full">
        <div className="cloud absolute bg-white rounded-full h-12 w-24 top-10 left-40 animate-clouds"></div>
        <div className="cloud absolute bg-white rounded-full h-12 w-48 top-20 left-40 animate-clouds"></div>
        <div className="tamagotchi absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <img src={petImageSource} alt="Tamagotchi" className="w-12 h-12" />
        </div>
      </div>
    </div>
  );
}
