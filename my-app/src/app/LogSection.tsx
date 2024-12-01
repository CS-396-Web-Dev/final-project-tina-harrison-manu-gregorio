import { jersey20 } from "./fonts/fonts";
import { usePetContext } from "./PetContext";

export default function LogSection() {
    const { logs } = usePetContext();

    return (
        <div className="bg-black h-2/5 mt-12 rounded-md text-left text-white">
            <h2 className={`${jersey20.className} text-2xl ml-3 mt-3`}>Log</h2>
            <div className="ml-3 mt-2">
                { logs.slice(-9).map((log, index) => <p className={`${jersey20.className} text-xl`} key={index}>{ log }</p>) }
            </div>
        </div>
    );
}