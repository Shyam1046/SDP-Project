// src/pages/exams/GradeHistory.jsx
import React from "react";

export default function GradeHistory({ data = null }) {
  const history =
    data?.history ?? [
      { semester: "Odd 2024", gpa: 8.4, credits: 20 },
      { semester: "Even 2024", gpa: 8.1, credits: 22 },
      { semester: "Odd 2023", gpa: 7.9, credits: 20 },
    ];

  const cgpa =
    data?.cgpa ?? (history.length ? (history.reduce((a, h) => a + h.gpa * h.credits, 0) / history.reduce((a, h) => a + h.credits, 0)).toFixed(2) : "N/A");

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">Academic Record</p>
            <p className="text-2xl font-bold text-gray-900">CGPA: {cgpa}</p>
          </div>
        </div>

        <div className="space-y-3">
          {history.map((h) => (
            <div key={h.semester} className="p-3 border rounded-lg bg-gray-50 flex items-center justify-between">
              <div>
                <p className="font-semibold">{h.semester}</p>
                <p className="text-xs text-gray-500 mt-1">{h.credits} credits</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{h.gpa}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
