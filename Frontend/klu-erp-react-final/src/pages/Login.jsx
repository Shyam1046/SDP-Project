import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [facultyCode, setFacultyCode] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    setCaptcha(code);
    setUserCaptcha("");
  };

  useEffect(() => generateCaptcha(), []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userType) return alert("Please select whether you are a Student or Faculty.");
    if (!email || !password) return alert("Please fill in both email and password.");
    if (!email.endsWith("@gmail.com")) return alert("Email must end with @gmail.com");
    if (userType === "faculty" && !facultyCode) return alert("Please enter your Faculty Code.");
    if (userCaptcha.toUpperCase() !== captcha) {
      alert("Invalid CAPTCHA. Please try again.");
      generateCaptcha();
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.status === 200) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userType", res.data.userType);
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      generateCaptcha();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/2 bg-gradient-to-br from-[#b30000] via-[#cc0000] to-[#e63946] flex flex-col items-center justify-center p-8 text-white">
          <img
            src="/assets/images/kl logo.png"
            alt="KL University Logo"
            className="w-48 h-auto mb-4 drop-shadow-lg bg-white rounded-full p-2"
          />
          <h2 className="text-lg font-semibold text-center">
            Koneru Lakshmaiah <br /> Deemed to be University
          </h2>
        </div>

        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">KLU ERP Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center gap-6 mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="userType"
                  value="student"
                  checked={userType === "student"}
                  onChange={(e) => setUserType(e.target.value)}
                  className="accent-[#b30000]"
                />
                <span className="text-gray-700 font-medium">Student</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="userType"
                  value="faculty"
                  checked={userType === "faculty"}
                  onChange={(e) => setUserType(e.target.value)}
                  className="accent-[#b30000]"
                />
                <span className="text-gray-700 font-medium">Faculty</span>
              </label>
            </div>

            <input
              type="email"
              placeholder="Email (must end with @gmail.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b30000] outline-none"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b30000] outline-none"
              required
            />

            {userType === "faculty" && (
              <input
                type="text"
                placeholder="Faculty Code"
                value={facultyCode}
                onChange={(e) => setFacultyCode(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b30000] outline-none"
              />
            )}

            <div className="flex items-center justify-between">
              <div className="px-4 py-2 bg-gray-100 border rounded-lg font-mono text-lg tracking-widest select-none">
                {captcha}
              </div>
              <button
                type="button"
                onClick={generateCaptcha}
                className="text-sm text-[#b30000] hover:underline"
              >
                Refresh
              </button>
            </div>

            <input
              type="text"
              placeholder="Enter CAPTCHA"
              value={userCaptcha}
              onChange={(e) => setUserCaptcha(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b30000] outline-none"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#b30000] hover:bg-[#990000] text-white font-semibold py-2 rounded-lg transition"
            >
              Login
            </button>

            <p
              className="text-sm text-center text-[#b30000] mt-3 cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Don’t have an account? Create one
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
