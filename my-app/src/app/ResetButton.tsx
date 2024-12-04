import { usePetContext } from "./PetContext";

export default function ResetButton() {
    const { resetPet } = usePetContext();

    return (
        <img className="absolute left-4 w-5 h-5 cursor-pointer" src="/reset.png" onClick={resetPet} alt="Reset pet" />
    );
}