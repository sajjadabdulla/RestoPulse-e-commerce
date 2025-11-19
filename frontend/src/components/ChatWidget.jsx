import { useState } from "react";

export default function ChatWidget({ isOpen, closeChat }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { from: "user", text: input }]);

    const res = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input }),
    });

    const data = await res.json();

    // Add AI reply
    setMessages((prev) => [...prev, { from: "bot", text: data.answer }]);

    setInput("");
  };

  if (!isOpen) return null; // hide widget

  return (
    <div className="fixed bottom-20 right-6 w-80 h-96 bg-white border shadow-xl rounded-lg flex flex-col">
      {/* Header */}
      <div className="p-3 border-b flex justify-between">
        <h2 className="font-bold">AI Assistant</h2>
        <button onClick={closeChat}>✖</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, i) => (
          <p
            key={i}
            className={msg.from === "user" ? "text-right" : "text-left"}
          >
            <span
              className={`inline-block px-2 py-1 rounded ${
                msg.from === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300"
              }`}
            >
              {msg.text}
            </span>
          </p>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t flex">
        <input
          className="flex-1 border rounded px-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
