// src/pages/academics/StatsOverview.jsx
import React from "react";
import { BookOpen, TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";

export default function StatsOverview({ data = null }) {
  // ----------------------------
  // DEFAULT SAMPLE DATA (auto-loaded)
  // ----------------------------
  const subjects =
    data?.subjects ??
    [
      {
        id: "os",
        name: "Operating Systems",
        code: "CS401",
        attendance: 86,
        components: ["Process Mgmt", "Memory Mgmt", "CPU Scheduling"],
      },
      {
        id: "dbms",
        name: "Database Management Systems",
        code: "CS402",
        attendance: 92,
        components: ["SQL", "ER Model", "Transactions", "Indexing"],
      },
      {
        id: "aiml",
        name: "AI & Machine Learning",
        code: "CS403",
        attendance: 72,
        components: ["ML Basics", "Regression", "Classification", "NN"],
      },
      {
        id: "fed",
        name: "Front-End Development",
        code: "CS404",
        attendance: 64,
        components: ["HTML", "CSS", "React", "Routing"],
      },
      {
        id: "oop",
        name: "Object-Oriented Programming",
        code: "CS405",
        attendance: 80,
        components: ["Classes", "Inheritance", "Polymorphism"],
      },
    ];

  // ----------------------------
  // COMPUTED METRICS
  // ----------------------------
  const avg =
    subjects.length > 0
      ? Math.round(subjects.reduce((a, s) => a + s.attendance, 0) / subjects.length)
      : 0;

  const getStatus = (attendance) => {
    if (attendance >= 85)
      return { label: "Excellent", bar: "bg-green-500", badge: "bg-green-100 text-green-700" };
    if (attendance >= 75)
      return { label: "Good", bar: "bg-blue-500", badge: "bg-blue-100 text-blue-700" };
    if (attendance >= 70)
      return { label: "Warning", bar: "bg-yellow-500", badge: "bg-yellow-100 text-yellow-700" };
    return { label: "Critical", bar: "bg-red-500", badge: "bg-red-100 text-red-700" };
  };

  return (
    <div className="space-y-6">
      {/* ------------------------- */}
      {/* TOP SUMMARY CARDS         */}
      {/* ------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Subjects */}
        <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-200">
          <div className="flex items-center justify-between mb-3">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-600">Total Subjects</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{subjects.length}</p>
          <p className="text-sm text-gray-500 mt-1">This semester</p>
        </div>

        {/* Avg Attendance */}
        <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-600">Avg Attendance</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{avg}%</p>
          <p className="text-sm text-gray-500 mt-1">Across all subjects</p>
        </div>

        {/* Good Standing */}
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <CheckCircle className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Good Standing</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {subjects.filter((s) => s.attendance >= 75).length}
          </p>
          <p className="text-sm text-gray-500 mt-1">Subjects ≥ 75%</p>
        </div>

        {/* Needs Attention */}
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
          <div className="flex items-center justify-between mb-3">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
            <span className="text-sm font-medium text-amber-600">Needs Attention</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {subjects.filter((s) => s.attendance < 75).length}
          </p>
          <p className="text-sm text-gray-500 mt-1">Subjects &lt; 75%</p>
        </div>
      </div>

      {/* ------------------------- */}
      {/* SUBJECT LIST WITH STATUS  */}
      {/* ------------------------- */}
      <div className="bg-white rounded-2xl p-6 border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Subjects Overview</h3>

        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
          {subjects.map((s) => {
            const st = getStatus(s.attendance);

            return (
              <div
                key={s.id}
                className="p-4 rounded-xl border hover:shadow-sm transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.code}</p>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${st.badge}`}>
                    {st.label}
                  </span>
                </div>

                {/* Attendance Bar */}
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`h-2 rounded-full ${st.bar}`} style={{ width: `${s.attendance}%` }} />
                </div>

                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{s.attendance}%</span>
                  <span>{s.components.length} units</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
