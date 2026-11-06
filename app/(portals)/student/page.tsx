"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lip/supabase";
import { useRouter } from "next/navigation";

type Application = {
  id: number;
  student_name: string;
  grade: string;
  status: string;
};

export default function StudentPortal() {
  const [application, setApplication] = useState<Application | null>(null);
  const [fetchError, setFetchError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMyApplication = async () => {
      // 1. Check who is logged in
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      // 2. Fetch ONLY the application that matches their user_id
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", session.user.id) // 👈 The Magic Filter!
        .maybeSingle();

      if (error) {
        setFetchError(error.message);
      } else {
        setApplication(data);
      }
      setLoading(false);
    };

    fetchMyApplication();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-5">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Student Portal</h1>
          <button onClick={handleLogout} className="text-red-600 font-medium">
            Log Out
          </button>
        </div>

        {fetchError ? (
          <div
            role="alert"
            className="bg-white p-8 rounded-xl shadow-md text-center text-red-600"
          >
            Unable to load your application: {fetchError}
          </div>
        ) : application ? (
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-4">
              Application Details
            </h2>
            <div className="space-y-3">
              <p>
                <strong>Student:</strong> {application.student_name}
              </p>
              <p>
                <strong>Grade Applied:</strong> {application.grade}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    application.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : application.status === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {application.status || "Pending Review"}
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-md text-center text-gray-500">
            No application found for this account.
          </div>
        )}
      </div>
    </div>
  );
}
