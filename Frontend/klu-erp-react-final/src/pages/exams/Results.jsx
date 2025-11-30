// src/pages/exams/Results.jsx
import React from "react";

export default function Results({ data = null }) {
  const results =
    data?.results ?? [
      { id: "r1", subject: "Data Structures", marks: 82, outOf: 100, grade: "A", status: "Pass", date: "2025-06-20" },
      { id: "r2", subject: "DBMS", marks: 91, outOf: 100, grade: "A+", status: "Pass", date: "2025-06-22" },
      { id: "r3", subject: "Operating Systems", marks: 74, outOf: 100, grade: "B+", status: "Pass", date: "2025-06-25" },
      { id: "r4", subject: "Web Technologies", marks: 66, outOf: 100, grade: "C", status: "Pass", date: "2025-06-28" },
    ];

  const overallGPA =
    data?.overallGPA ??
    (results.length ? (results.reduce((a, r) => a + (r.marks / r.outOf) * 10, 0) / results.length).toFixed(2) : "N/A");

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">Last Exam Cycle</p>
            <p className="text-2xl font-bold text-gray-900">Overall GPA: {overallGPA}</p>
          </div>
        </div>

        <div className="space-y-3">
          {results.map((r) => (
            <div key={r.id} className="p-3 border rounded-lg bg-gray-50 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{r.subject}</p>
                <p className="text-xs text-gray-500 mt-1">Date: {new Date(r.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{r.marks}/{r.outOf}</p>
                <p className={`text-xs font-semibold mt-1 ${r.status === "Pass" ? "text-green-700" : "text-red-700"}`}>{r.grade} • {r.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
