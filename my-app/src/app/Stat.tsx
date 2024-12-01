interface StatProps {
  label: string;
  value: number;
}

export default function Stat({ label, value }: StatProps) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <label className="font-bold w-1/3 text-right">{label}:</label>
      <div className="w-2/3 h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}
