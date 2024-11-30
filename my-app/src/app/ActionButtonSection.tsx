import ActionButton from "./ActionButton";

export default function ActionButtonSection() {
    return (
        <div className="flex flex-row space-x-4 gap-8 justify-center mt-9">
            <ActionButton label="Feed" color="text-red-500"/>
            <ActionButton label="Play" color="text-green-500"/>
            <ActionButton label="Sleep" color="text-pink-500"/>
            <ActionButton label="Clean" color="text-blue-500"/>
        </div>
    );
}