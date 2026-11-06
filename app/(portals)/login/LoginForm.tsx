"use client";

import { useState } from "react";
import { supabase } from "../../lip/supabase";
import { useRouter } from "next/navigation";

type LoginRole = "admin" | "student" | "auto";

export default function LoginForm({ role }: { role: LoginRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    const isAdmin = data.user.email?.toLowerCase() === "admin@school.com";
    const roleMismatch =
      (role === "admin" && !isAdmin) || (role === "student" && isAdmin);

    if (roleMismatch) {
      const { error: signOutError } = await supabase.auth.signOut();
      setError(
        signOutError
          ? `Choose the correct portal for this account. Unable to sign out: ${signOutError.message}`
          : `This account does not have access to the ${role} portal.`,
      );
      setLoading(false);
      return;
    }

    router.push(isAdmin ? "/admin" : "/student");
  };

  const title =
    role === "auto"
      ? "Portal Login"
      : `${role === "admin" ? "Admin" : "Student"} Login`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-5">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-500 text-sm">
            Enter your credentials to access your dashboard.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center font-medium border border-red-100"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="login-email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={
                role === "admin" ? "admin@school.com" : "student@example.com"
              }
              autoComplete="username"
            />
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
