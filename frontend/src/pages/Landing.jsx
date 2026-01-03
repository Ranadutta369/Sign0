import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050914] to-[#0b1220] text-white">
      <Navbar loggedIn={false} />
      <div className="flex flex-col items-center justify-center text-center px-6 py-32">
        <h1 className="text-4xl md:text-5xl font-bold max-w-3xl">
          Bridging Communication Gaps with AI-Powered Sign Language Recognition
        </h1>
        <p className="text-gray-400 mt-6 max-w-xl">
          Real-time translation of sign language into text and speech.
        </p>
        <div className="flex gap-4 mt-10">
          <Link to="/dashboard" className="px-8 py-3 rounded-full bg-blue-500">
            Get Started
          </Link>
          <button className="px-8 py-3 rounded-full border">Watch Demo</button>
        </div>
      </div>
    </div>
  );
}
