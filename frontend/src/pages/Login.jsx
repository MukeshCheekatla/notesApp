import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const result =
        authMode === "login"
          ? await login(username, password)
          : await register(username, password);

      if (!result.success) {
        setError(result.error || "Authentication failed");
      }
    } catch {
      setError("Network error. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-900 px-6 py-12">
      {/* Logo + Title */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          {authMode === "login" ? "Sign in to your account" : "Create an account"}
        </h2>
      </div>

      {/* Auth card */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white/10 p-8 rounded-xl shadow-xl backdrop-blur">
        {error && (
          <div className="bg-red-500/20 text-red-300 border border-red-500 rounded-md px-4 py-2 mb-4">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm/6 font-medium text-gray-200">
              Username
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={username}
                onKeyPress={handleKeyPress}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm/6 font-medium text-gray-200">
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                value={password}
                onKeyPress={handleKeyPress}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 disabled:bg-indigo-300"
          >
            {loading
              ? "Loading..."
              : authMode === "login"
              ? "Sign in"
              : "Sign up"}
          </button>
        </div>

        {/* Switch Mode */}
        <p className="mt-10 text-center text-sm text-gray-400">
          {authMode === "login" ? (
            <>
              Not a member?{" "}
              <button
                disabled={loading}
                onClick={() => {
                  setAuthMode("register");
                  setError("");
                }}
                className="font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                disabled={loading}
                onClick={() => {
                  setAuthMode("login");
                  setError("");
                }}
                className="font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
