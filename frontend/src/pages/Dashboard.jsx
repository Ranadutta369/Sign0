import { Video } from "lucide-react";
import { DashboardLayout } from "../components/Layout";
import { SessionCard } from "../components/SessionCard";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="bg-[#111a2e] rounded-2xl p-16 flex flex-col items-center shadow-xl">
        <Video size={48} className="mb-4" />
        <button className="px-8 py-3 rounded-full bg-blue-500">
          Start New Session
        </button>
        <p className="text-gray-400 mt-2">
          Begin real-time sign language translation.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <SessionCard title="Last few session 1" date="May 24, 2023" />
          <SessionCard title="Last few session 2" date="May 23, 2023" />
          <SessionCard title="Last few session 3" date="May 22, 2023" />
        </div>
      </div>
    </DashboardLayout>
  );
}
