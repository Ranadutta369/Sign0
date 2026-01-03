import Navbar from "./Navbar";
import { Sidebar } from "./Sidebar";

export function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050914] to-[#0b1220] text-white">
      <Navbar loggedIn />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-10">{children}</main>
      </div>
    </div>
  );
}
