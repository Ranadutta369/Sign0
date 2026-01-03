export function Sidebar() {
  return (
    <aside className="w-64 bg-[#0b1220] text-gray-300 p-6 space-y-4">
      <div className="text-white font-semibold mb-6">Dashboard</div>
      <nav className="space-y-3">
        <div className="text-blue-400">Dashboard</div>
        <div>My Sessions</div>
        <div>Phrasebook</div>
        <div>Settings</div>
        <div>Help</div>
      </nav>
    </aside>
  );
}
