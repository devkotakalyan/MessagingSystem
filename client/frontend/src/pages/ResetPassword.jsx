import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updatePassword } from "../services/authService";
import FormInput from "../components/auth/FormInput";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updatePassword(password);
      toast.success("Password updated. Please sign in again.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Could not update password");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <h1 className="mb-1 text-xl font-semibold text-white">Choose a new password</h1>
      <p className="mb-6 text-sm text-slate-400">
        This link was opened from your password reset email.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="New password"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-60"
        >
          {submitting ? "Updating..." : "Update password"}
        </button>
      </form>
    </>
  );
}
