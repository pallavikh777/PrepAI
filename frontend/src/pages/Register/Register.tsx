import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      alert("Account created successfully! 🎉");

      setEmail("");
      setPassword("");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-white text-center">
          Create Account
        </h1>

        <p className="text-slate-400 text-center mt-3">
          Start your interview preparation with PrepAI
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">

          <div>
            <label className="block text-white mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-800
              border border-slate-700 text-white
              focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-white mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-lg bg-slate-800
              border border-slate-700 text-white
              focus:outline-none focus:border-cyan-400"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-cyan-500
            text-slate-950 font-semibold
            hover:bg-cyan-400 transition
            disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Register;