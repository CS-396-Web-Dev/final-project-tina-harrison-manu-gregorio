import ActionButton from "./ActionButton";

export default function ActionButtonSection() {
    return (
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-8 place-items-center mt-5 lg:mt-10">
            <ActionButton label="Feed" color="text-red-500"/>
            <ActionButton label="Play" color="text-green-500"/>
            <ActionButton label="Sleep" color="text-pink-500"/>
            <ActionButton label="Clean" color="text-blue-500"/>
        </section>
    );
}