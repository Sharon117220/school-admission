"use client";
import { useState } from "react";
import { supabase } from "../../lip/supabase";

export default function AdmissionForm() {
  const [submitted, setSubmitted] = useState(false);
  const [confirmationRequired, setConfirmationRequired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const getText = (name: string) => {
      const value = formData.get(name);
      return typeof value === "string" ? value.trim() : "";
    };
    const email = getText("email");
    const application = {
      student_name: getText("studentName"),
      parent_name: getText("parentName"),
      phone: getText("phone"),
      grade: getText("grade"),
    };

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { application } },
      });

      if (authError) {
        throw authError;
      }
      if (!authData.user) {
        throw new Error("Your account could not be created. Please try again.");
      }
      if (authData.user.identities?.length === 0) {
        throw new Error(
          "An account already exists for this email. Sign in to the Student Portal instead.",
        );
      }

      setConfirmationRequired(!authData.session);
      setSubmitted(true);
    } catch (submissionError) {
      console.error("Unable to create admission application:", submissionError);
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to submit your application. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="admission" className="py-20 px-5 bg-blue-700 text-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Apply for Admission
        </h2>
        <p className="text-center text-blue-100 mb-10">
          Create an account to submit and track your application.
        </p>

        {submitted ? (
          <div
            role="status"
            className="rounded-2xl bg-white p-8 text-center text-slate-800 shadow-xl"
          >
            <p className="text-xl font-bold text-blue-800">
              {confirmationRequired
                ? "One more step: verify your email"
                : "Your application is in!"}
            </p>
            <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-600">
              {confirmationRequired
                ? "We created your application. Follow the confirmation link in your inbox, then sign in to the Student Portal to track its progress."
                : "Your application has been received. You can now sign in to the Student Portal to track its progress."}
            </p>
            <a
              href="/login/student"
              className="mt-6 inline-flex rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Go to Student Portal
            </a>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white text-gray-800 p-8 rounded-xl shadow-xl grid gap-5"
          >
            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 p-3 text-center text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <div className="grid grid-cols-1 gap-5">
              <Field label="Student's Full Name" name="studentName" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Parent / Guardian Name" name="parentName" />
              <Field label="Phone Number" name="phone" type="tel" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Email Address" name="email" type="email" />

              <div>
                <label
                  htmlFor="createPassword"
                  className="block mb-1 font-medium"
                >
                  Create a Password
                </label>
                <input
                  id="createPassword"
                  name="createPassword"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="h-10 w-full border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="grade" className="block mb-1 font-medium">
                Class Applying For
              </label>
              <select
                id="grade"
                name="grade"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a class</option>
                {Array.from({ length: 12 }, (_, index) => (
                  <option key={index + 1}>Grade {index + 1}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-700 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit application"}
            </button>
            <p className="text-center text-xs leading-5 text-gray-500">
              Submitting creates your student account. We may ask you to verify
              your email before you sign in.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block mb-1 font-medium">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        required
        maxLength={name === "phone" ? 30 : 100}
        autoComplete={
          name === "email"
            ? "email"
            : name === "phone"
              ? "tel"
              : name === "parentName" || name === "studentName"
                ? "name"
                : undefined
        }
        className="h-10 w-full min-w-0 rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
