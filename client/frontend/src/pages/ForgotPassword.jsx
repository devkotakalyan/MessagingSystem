import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { sendPasswordReset } from "../services/authService";
import FormInput from "../components/auth/FormInput";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await sendPasswordReset(email);
      setSent(true);
    } catch (err) {
      toast.error(err.message || "Could not send reset email");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="text-center">
        <h1 className="mb-2 text-xl font-semibold text-white">Check your email</h1>
        <p className="text-sm text-slate-400">
          We sent a password reset link to <span className="text-white">{email}</span>.
        </p>
        <Link to="/login" className="mt-6 inline-block text-sm text-indigo-400 hover:text-indigo-300">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-1 text-xl font-semibold text-white">Reset your password</h1>
      <p className="mb-6 text-sm text-slate-400">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Send reset link"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        <Link to="/login" className="text-indigo-400 hover:text-indigo-300">
          Back to sign in
        </Link>
      </p>
    </>
  );
}
