interface ScreenProps {
  petDescriptor: string;
}

export default function ScreenSection({ petDescriptor }: ScreenProps) {
  let petImageSource = "/normal-cat.png";

  function changeSource() {
    if (
      petDescriptor == "stinky" ||
      petDescriptor == "sad" ||
      petDescriptor == "sleepy" ||
      petDescriptor == "hungry"
    ) {
      petImageSource = "/" + petDescriptor + "-cat.png";
    }
  }

  changeSource();

  return (
    <div className="lg:w-1/3 h-5/6 mt-5 bg-sky-400 rounded-md relative">
      <div className="ground w-full h-16 bg-green-500 absolute bottom-0 rounded-md"></div>
      <div className="scene sky w-full h-full">
        <div className="cloud absolute bg-white rounded-full h-12 w-32 top-10 left-40 animate-clouds"></div>
        <div className="cloud absolute bg-white rounded-full h-12 w-48 top-20 left-36 animate-clouds"></div>
        <div className="cloud absolute bg-white rounded-full h-12 w-32 top-48 left-72 animate-clouds"></div>
        <div className="cloud absolute bg-white rounded-full h-12 w-48 top-56 left-64 animate-clouds"></div>
        <div className="tamagotchi absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <img src={petImageSource} alt="Tamagotchi" className="w-32 h-32" />
        </div>
      </div>
    </div>
  );
}
