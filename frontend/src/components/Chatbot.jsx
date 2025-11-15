import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { API_PATHS, BASE_URL } from "../utils/apiPath";
import { MessageCircle,Send } from "lucide-react";

export default function Chatbot() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleChat = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/${API_PATHS.AI.CHATBOT}`,
        {prompt}
      );
      setMessages(res.data);
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-yellow-600 cursor-pointer p-4 rounded-full shadow-lg hover:bg-yellow-400 transition"
          >
            <MessageCircle className="text-black w-6 h-6" />
          </button>
        )}
        {isOpen && (
          <div className="bg-neutral-900 text-white rounded-xl shadow-lg w-80 h-[70vh] flex flex-col border border-neutral-800">
            <div className="flex justify-between items-center p-3 border-b border-neutral-800">
              <h3 className="text-lg font-semibold text-amber-500">
                Mentor AI
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {messages}
            </div>

            <form
              onSubmit={handleChat}
              className="flex items-center p-3 border-t border-neutral-800"
            >
              <input
                type="text"
                placeholder="Ask something..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 bg-neutral-800 text-white rounded px-3 py-2 text-sm focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="ml-2 bg-amber-500 cursor-pointer text-black rounded px-3 py-2 hover:bg-amber-400 flex items-center"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
