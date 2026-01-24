import { useRef, useState } from "react";
import { Video, Upload, X } from "lucide-react";
import { DashboardLayout } from "../components/Layout";
import { SessionCard } from "../components/SessionCard";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export default function Dashboard() {
  const fileInputRef = useRef(null);

  const [imageSrc, setImageSrc] = useState(null);
  const [recognizedLetter, setRecognizedLetter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Full = reader.result;
      const base64Data = base64Full.split(",")[1];

      setImageSrc(base64Full);
      setShowModal(true);
      setLoading(true);
      setRecognizedLetter(null);

      await recognizeASL(base64Data, file.type);
    };

    reader.readAsDataURL(file);
  };

  const recognizeASL = async (base64Data, mimeType) => {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text:
                      "This image shows a single American Sign Language hand sign. " +
                      "Respond with ONLY the single English letter being signed.",
                  },
                  {
                    inlineData: {
                      mimeType,
                      data: base64Data,
                    },
                  },
                ],
              },
            ],
          }),
        },
      );

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      console.log(data)

      setRecognizedLetter(text || "A");
    } catch (err) {
      console.error(err);
      setRecognizedLetter("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-[#111a2e] rounded-2xl p-16 flex flex-col items-center shadow-xl">
        <Video size={48} className="mb-4" />

        <button className="px-8 py-3 rounded-full bg-blue-500 mb-3">
          Start New Session
        </button>

        <button
          onClick={handleUploadClick}
          className="px-8 py-3 rounded-full bg-slate-600 flex items-center gap-2"
        >
          <Upload size={18} />
          Upload File
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <p className="text-gray-400 mt-2">
          Begin real-time sign language translation.
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#111a2e] rounded-2xl p-6 w-[320px] relative shadow-xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400"
            >
              <X size={20} />
            </button>

            <img src={imageSrc} alt="Uploaded" className="rounded-lg mb-4" />

            {loading && (
              <p className="text-gray-400 text-center">Recognizing sign…</p>
            )}

            {!loading && recognizedLetter && (
              <p className="text-center text-2xl font-bold text-green-400">
                {recognizedLetter}
              </p>
            )}
          </div>
        </div>
      )}

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
