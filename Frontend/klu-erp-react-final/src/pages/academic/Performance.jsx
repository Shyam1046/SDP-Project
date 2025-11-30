// src/pages/academics/Performance.jsx
import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function Performance({ data = null }) {
  // ------------------------------
  // SAMPLE PERFORMANCE DATA
  // ------------------------------
  const subjects =
    data?.subjects ??
    [
      {
        id: "os",
        name: "Operating Systems",
        code: "CS401",
        attendance: 86,
        grade: "A",
        gradePoint: 8.6,
        trend: "up",
      },
      {
        id: "dbms",
        name: "Database Management Systems",
        code: "CS402",
        attendance: 92,
        grade: "A+",
        gradePoint: 9.5,
        trend: "up",
      },
      {
        id: "aiml",
        name: "AI & Machine Learning",
        code: "CS403",
        attendance: 72,
        grade: "B",
        gradePoint: 7.4,
        trend: "down",
      },
      {
        id: "fed",
        name: "Front-End Development",
        code: "CS404",
        attendance: 64,
        grade: "C",
        gradePoint: 6.1,
        trend: "down",
      },
      {
        id: "oop",
        name: "Object-Oriented Programming",
        code: "CS405",
        attendance: 80,
        grade: "B+",
        gradePoint: 7.9,
        trend: "neutral",
      },
    ];

  const getTrendIcon = (trend) => {
    if (trend === "up") return <TrendingUp className="w-5 h-5 text-green-600" />;
    if (trend === "down") return <TrendingDown className="w-5 h-5 text-red-600" />;
    return <Minus className="w-5 h-5 text-gray-500" />;
  };

  const getGradeColor = (grade) => {
    if (["A+", "A"].includes(grade)) return "bg-green-100 text-green-700";
    if (["B+", "B"].includes(grade)) return "bg-blue-100 text-blue-700";
    if (grade === "C") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Performance</h2>
        <p className="text-sm text-gray-500">
          Subject-wise performance, grades, and improvement trends.
        </p>
      </div>

      {/* Subject Performance Cards */}
      <div className="bg-white rounded-2xl p-6 border shadow-sm">
        <div className="space-y-4">
          {subjects.map((s) => (
            <div
              key={s.id}
              className="p-4 border rounded-xl hover:shadow-sm transition"
            >
              <div className="flex items-center justify-between">
                
                {/* Subject Info */}
                <div>
                  <p className="font-semibold text-gray-900">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.code}</p>
                </div>

                {/* Grade */}
                <span
                  className={`px-3 py-1 text-sm rounded-full font-semibold ${getGradeColor(
                    s.grade
                  )}`}
                >
                  {s.grade}
                </span>
              </div>

              {/* Grade Point & Trend */}
              <div className="flex items-center justify-between mt-3">
                <p className="text-sm text-gray-600">
                  Grade Points:{" "}
                  <span className="font-semibold text-gray-900">{s.gradePoint}</span>
                </p>

                <div className="flex items-center gap-2">
                  {getTrendIcon(s.trend)}
                  <span className="text-sm text-gray-700 capitalize">
                    {s.trend === "up"
                      ? "Improving"
                      : s.trend === "down"
                      ? "Dropping"
                      : "Stable"}
                  </span>
                </div>
              </div>

              {/* Attendance Bar */}
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-1">Attendance</p>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-indigo-500"
                    style={{ width: `${s.attendance}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{s.attendance}%</span>
                  <span>Contribution to grade</span>
                </div>
              </div>
            </div>
          ))}

          {subjects.length === 0 && (
            <div className="text-center text-gray-500 py-6">
              No performance data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
