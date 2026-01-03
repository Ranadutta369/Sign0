import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Navbar({ loggedIn }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#0b1220] text-white">
      <div className="font-semibold text-lg">Visual Architects – Signo</div>
      <div className="flex gap-6 items-center">
        {!loggedIn ? (
          <>
            <Link to="#">Features</Link>
            <Link to="#">How it Works</Link>
            <Link to="#">About Us</Link>
            <Link to="/dashboard" className="px-4 py-1 rounded-md border">
              Login
            </Link>
          </>
        ) : (
          <button className="flex items-center gap-2 px-3 py-1 rounded-md border">
            <LogOut size={16} /> Logout
          </button>
        )}
      </div>
    </div>
  );
}
