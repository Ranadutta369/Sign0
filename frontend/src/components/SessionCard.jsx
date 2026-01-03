export function SessionCard({ title, date }) {
  return (
    <div className="flex justify-between bg-[#111a2e] p-4 rounded-xl">
      <div>
        <div>{title}</div>
        <div className="text-sm text-gray-400">{date}</div>
      </div>
      <button className="text-blue-400">View Transcript</button>
    </div>
  );
}
