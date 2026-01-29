import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages([...messages, userMsg]);
    setInput("");
    setLoading(true);

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCfpNKPbDxyu4SeGurKLpAoRxRbrnu9scE",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: input }] }],
        }),
      }
    );

    const data = await res.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't understand.";

    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: reply },
    ]);
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
