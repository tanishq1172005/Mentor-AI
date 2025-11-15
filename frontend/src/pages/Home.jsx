import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_PATHS, BASE_URL } from "../utils/apiPath";
import { toast } from "react-toastify";
import { Search, BookOpen } from "lucide-react";
import Chatbot from "../components/Chatbot";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [framework, setFramework] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [docs, setDocs] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
    const fetchDocs = async () => {
      try {
        const token = user?.token;
        const res = await axios.get(
          `${BASE_URL}/${API_PATHS.DOCUMENTATION.ALL_DOCS}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDocs(res.data.docs);
        setFilteredDocs(res.data.docs);
      } catch (err) {
        toast.error(err);
      }
    };
    fetchDocs();
  }, []);

  const navigate = useNavigate();

  const addDocs = async (e) => {
    e.preventDefault()
    try {
      const token = user?.token;
      const res = await axios.post(
        `${BASE_URL}/${API_PATHS.DOCUMENTATION.ADD_DOCS}`,
        { framework, topic, content, sourceUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data) {
        setShowModal(false)
        return toast.success(res.data.message || "Yo");
        
      }
    } catch (err) {
      toast.error(err);
    }
  };
  

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-yellow-600">MENTOR AI</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {docs.length > 0 ? (
          docs.map((doc) => (
            <div
              key={doc._id}
              className="bg-neutral-900 rounded-xl p-5 shadow hover:shadow-yellow-500"
            >
              <div className="flex items-center mb-3">
                <BookOpen className="text-yellow-600 mr-2" />
                <h3 className="text-lg font-semibold">{doc.topic}</h3>
              </div>
              <p className="text-sm text-gray-400 line-clamp-3">
                {doc.content.slice(0, 150)}
              </p>
              <a
                href={`${doc.sourceUrl}`}
                className="text-yellow-600 text-sm font-semibold hover:underline mt-2 inline-block"
              >
                View details
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No documentation found</p>
        )}
      </div>

      <div className="w-full flex gap-3 mt-10 mb-6  flex-col items-center">
        <h2 className="text-gray-300">Support the Community Add Docs</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-yellow-600 p-2 w-20 rounded-3xl cursor-pointer text-black"
        >
          Add
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-neutral-900 text-white rounded-xl p-6 w-full max-w-lg border border-neutral-700 shadow-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
            >
              X
            </button>
            <h2>Add Documentation</h2>

            <form onSubmit={addDocs} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-300">Framework</label>
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value)}
                  className="bg-neutral-800 cursor-pointer p-2 rounded text-white focus:outline-none"
                >
                  <option>Select an option</option>
                  <option value="react">React</option>
                  <option value="tailwind">Tailwind</option>
                  <option value="express">Express</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-300">Topic</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter Topic"
                  className="bg-neutral-800 p-2 rounded text-white focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-300">Content</label>
                <textarea
                  className="bg-neutral-800 p-2 rounded text-white h-32 focus:outline-none resize-none"
                  placeholder="Enter documentation content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-300">Source Url</label>
                <input
                  type="text"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://"
                  className="bg-neutral-800 p-2 rounded text-white focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-600 text-black font-semibold py-2 rounded-lg cursor-pointer hover:bg-yellow-500 transition"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}
      <Chatbot />
    </div>
  );
}
