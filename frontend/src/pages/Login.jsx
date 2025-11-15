import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { login } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { API_PATHS, BASE_URL } from "../utils/apiPath";
import { toast } from "react-toastify";

export default function Login(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [showPassword,setShowPassword] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit=async(e)=>{
      e.preventDefault()
      try{
        const res = await axios.post(`${BASE_URL}/${API_PATHS.AUTH.LOGIN}`,{email,password})
        dispatch(login(res.data))
        navigate('/')
      }catch(err){
        toast.error(err)
      }
    }
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-black text-center border-r border-gray-800">
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v4m0 10v4m4-8h4m-8 0H4m9.5 5.5L20 20m-16 0l4.5-4.5"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-yellow-600 tracking-wide">
            MENTOR AI
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center bg-[#121212]">
        <div className="bg-[#1a1a1a] p-10 rounded-2xl w-96 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Welcome Back
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>

            <div>
              <label className="block text-gray-400 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full bg-[#2a2a2a] text-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#2a2a2a] text-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-yellow-600 hover:bg-yellow-700 text-black font-semibold py-3 rounded-md transition-colors"
            >
              Log in
            </button>
            <p className="text-sm text-center">Don't have an account? <Link to='/register' className="text-blue-500">Sign Up</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}
