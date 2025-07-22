import React, { useState, useRef, useEffect } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "👋 Hi! How can I assist you with your travel plans today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const userText = input.toLowerCase();
    let botReply = "😕 Sorry, I didn’t understand that. Could you please rephrase?";

    if (userText.includes("book")) {
      botReply = "📅 You can book a ride anytime using the 'Booking' section on our homepage.";
    } else if (userText.includes("cancel")) {
      botReply = "❌ To cancel a booking, please reach out to our customer support.";
    } else if (userText.includes("car types") || userText.includes("cars")) {
      botReply = "🚗 We offer hatchbacks, sedans, SUVs, and luxury cars for your travel needs.";
    } else if (userText.includes("support")) {
      botReply = "📞 You can email us at support@carse-chalo.com or call us at +91-XXXXXXX.";
    } else if (userText.includes("hello") || userText.includes("hi")) {
      botReply = "👋 Hello! How can I assist you today?";
    } else if (userText.includes("feedback")) {
      botReply = "📝 We appreciate your feedback! Please email feedback@carse-chalo.com.";
    } else if (userText.includes("profile")) {
      botReply = "👤 You can manage your profile by logging in and visiting the Profile section.";
    } else if (userText.includes("manage cart") || userText.includes("cart")) {
      botReply = "🛒 You can view or manage your cart using the cart icon in the top navigation bar.";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      setIsTyping(false);
    }, 600);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden">
      {/* Chat Display */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-gradient-to-b from-white to-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow transition-opacity duration-300 animate-fadeIn ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end rounded-br-none"
                : "bg-gray-200 text-gray-900 self-start rounded-bl-none"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="text-gray-500 text-xs italic animate-pulse">CarSe-Chalo is typing...</div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-2 border-t bg-white flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm transition shadow"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
