"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lip/supabase";
import { useRouter } from "next/navigation";

type ApplicationStatus = "Pending" | "Approved" | "Rejected";

function isApplicationStatus(value: string): value is ApplicationStatus {
  return ["Pending", "Approved", "Rejected"].includes(value);
}

type Application = {
  id: number;
  created_at: string;
  student_name: string;
  parent_name: string;
  email: string;
  phone: string;
  grade: string;
  status: ApplicationStatus | null;
};

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [fetchError, setFetchError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserAndFetch = async () => {
      // 1. Check if logged in
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }
      if (session.user.email?.toLowerCase() !== "admin@school.com") {
        router.push("/student"); // Kick them back to the student portal
        return;
      }

      // 2. Fetch data
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching applications:", error);
        setFetchError(error.message);
      } else {
        setApplications(data || []);
      }
      setLoading(false);
    };

    checkUserAndFetch();
  }, [router]);

  const updateStatus = async (id: number, newStatus: ApplicationStatus) => {
    setStatusError("");
    setUpdatingId(id);

    try {
      const { data, error } = await supabase
        .from("applications")
        .update({ status: newStatus })
        .eq("id", id)
        .select("id")
        .maybeSingle();

      if (error) {
        throw error;
      }
      if (!data) {
        throw new Error(
          "No application was updated. Run supabase/applications-policies.sql in the Supabase SQL Editor, then try again.",
        );
      }

      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: newStatus } : app,
        ),
      );
    } catch (error) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string"
          ? error.message
          : "An unexpected error occurred.";
      const code =
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof error.code === "string"
          ? ` (${error.code})`
          : "";
      setStatusError(
        `Unable to save status${code}: ${message}`,
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold text-blue-700">
        Loading Admin Data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Dashboard
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Manage student applications and admissions.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-5 py-2.5 rounded-lg font-semibold hover:bg-red-100 transition"
          >
            Log Out
          </button>
        </div>

        {statusError && (
          <div
            role="alert"
            className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
          >
            {statusError}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm uppeercase tracking-wider">
                <th className="p-4 font-semibold ">Date</th>
                <th className="p-4 font-semibold">Student</th>
                <th className="p-4 font-semibold">Grade</th>
                <th className="p-4 font-semibold">Contact</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4 text-sm text-gray-500 witespace-nowrap">
                    {new Date(app.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-gray-800">
                      {app.student_name}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      Parent: {app.parent_name}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                      {app.grade}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    <div>{app.email}</div>
                    <div className="text-gray-400 mt-0.5">{app.phone}</div>
                  </td>
                  <td className="p-4">
                    {/* The Status Dropdown */}
                    <select
                      aria-label={`Application status for ${app.student_name}`}
                      value={app.status || "Pending"}
                      disabled={updatingId === app.id}
                      onChange={(e) => {
                        if (isApplicationStatus(e.target.value)) {
                          updateStatus(app.id, e.target.value);
                        }
                      }}
                      className={`p-2 rounded-lg font-bold text-sm border outline-none cursor-pointer transition ${
                        app.status === "Approved"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : app.status === "Rejected"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {fetchError ? (
            <div role="alert" className="p-6 text-center text-red-600">
              Unable to load applications: {fetchError}
            </div>
          ) : applications.length === 0 ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
              <span className="text-4xl mb-3">📭</span>
              <p> No applications found yet.</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
