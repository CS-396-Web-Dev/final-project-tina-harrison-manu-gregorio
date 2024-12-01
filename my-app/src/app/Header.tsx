import { useEffect, useRef, useState } from "react";
import { usePetContext } from "./PetContext";

export default function Header() {
    const { name, setName } = usePetContext();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
        }
    }, [isEditing]);

    const handleClick = () => {
        setIsEditing(true);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setIsEditing(false);
        }
    }

    return (
        <div>
            { isEditing
                ? <input
                    className="text-4xl rounded-md px-1"
                    ref={inputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown} 
                />
                : <div className="flex items-center justify-center">
                    <h1 className="text-4xl">{name}</h1>
                    <img className="w-5 h-5 ml-2 cursor-pointer" src="/pencil.png" alt="Edit pet name" onClick={handleClick} />
                </div>
            }
            <div className="w-full h-px mt-3 bg-black"></div>
        </div>
    );
}