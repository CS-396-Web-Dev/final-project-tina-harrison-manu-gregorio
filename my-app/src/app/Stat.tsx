import { jersey20 } from "./fonts/fonts";

interface StatProps {
    label: string;
    value: number;
}

export default function Stat({ label, value }: StatProps) {
    return (
        <div>
            <h3 className={`${jersey20.className} text-xl`}>{label}: {value}%</h3>
        </div>
    )
}