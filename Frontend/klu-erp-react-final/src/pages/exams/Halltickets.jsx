// src/pages/exams/HallTickets.jsx
import React from "react";

export default function HallTickets({ data = null }) {
  const tickets =
    data?.tickets ?? [
      { id: "HT-20251102-001", exam: "Data Structures", date: "2025-11-02", status: "Available" },
      { id: "HT-20251106-002", exam: "DBMS", date: "2025-11-06", status: "Available" },
      { id: "HT-20251112-003", exam: "Operating Systems", date: "2025-11-12", status: "Pending" },
    ];

  const download = (t) => {
    alert(`Download Hall Ticket stub: ${t.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Hall Tickets</h3>

        <div className="space-y-3">
          {tickets.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
              <div>
                <p className="font-semibold">{t.exam}</p>
                <p className="text-xs text-gray-500 mt-1">Date: {new Date(t.date).toLocaleDateString()}</p>
                <p className="text-xs text-gray-400 mt-1">ID: {t.id}</p>
              </div>

              <div className="text-right">
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${t.status === "Available" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {t.status}
                </div>
                <button onClick={() => download(t)} className="mt-2 px-3 py-1 rounded bg-indigo-600 text-white text-sm">Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
