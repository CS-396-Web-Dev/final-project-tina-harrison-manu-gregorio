import { jersey20 } from "./page";

interface ActionButtonProps {
    label: string;
    color: string;
}

export default function ActionButton({ label, color }: ActionButtonProps) {
    return (
        <div className="flex items-center justify-center w-32 h-28 bg-gray-300 rounded-md">
            <h2 className={`${jersey20.className} ${color} text-4xl`}>{ label }</h2>
        </div>
    );
}