import { useState } from "react";

const GEMINI_API_KEY = "AIzaSyCfpNKPbDxyu4SeGurKLpAoRxRbrnu9scE";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);

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
                    text: `You are an ASL assistant. Answer clearly and simply.\nUser: ${userText}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ??
        "Sorry, I couldn't understand.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Error connecting to assistant." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#0f172a] rounded-xl p-4 w-full max-w-md">
      <h2 className="text-white text-lg mb-2">ASL Assistant 🤖</h2>

      <div className="h-64 overflow-y-auto mb-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 ${
              m.role === "user" ? "text-blue-400" : "text-green-400"
            }`}
          >
            <b>{m.role === "user" ? "You" : "Bot"}:</b> {m.text}
          </div>
        ))}
      </div>

      <input
        className="w-full p-2 rounded mb-2"
        placeholder="Ask about ASL..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={sendMessage}
        className="w-full bg-blue-600 rounded p-2 text-white"
      >
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
}
