// src/pages/academics/Courses.jsx
import React, { useState } from "react";

export default function Courses({ data = null }) {
  // If no data is passed → use fallback demo dataset
  const subjects = data?.subjects ?? [
    {
      id: "os",
      name: "Operating Systems",
      code: "CS401",
      components: [
        "Process Management",
        "Memory Management",
        "Scheduling Algorithms",
        "File System",
        "Deadlock Handling",
      ],
    },
    {
      id: "dbms",
      name: "Database Management Systems",
      code: "CS402",
      components: [
        "ER Diagrams",
        "SQL Queries",
        "Joins & Subqueries",
        "Transactions",
        "Indexing",
      ],
    },
    {
      id: "aiml",
      name: "AI & Machine Learning",
      code: "CS403",
      components: [
        "Data Preprocessing",
        "Linear Regression",
        "Classification Models",
        "Neural Networks",
        "Evaluation Metrics",
      ],
    },
    {
      id: "fedf",
      name: "Front-End Development Framework",
      code: "CS404",
      components: [
        "HTML / CSS",
        "React Components",
        "State Management",
        "Routing",
        "API Integration",
      ],
    },
    {
      id: "oop",
      name: "Object-Oriented Programming",
      code: "CS405",
      components: [
        "Classes and Objects",
        "Inheritance",
        "Polymorphism",
        "Interfaces",
        "Encapsulation",
      ],
    },
  ];

  const [q, setQ] = useState("");

  const filtered = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(q.toLowerCase()) ||
      (s.code ?? "").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-6 border shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Course Details</h2>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search courses..."
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="bg-white rounded-2xl p-6 border shadow-sm">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="p-4 border rounded-xl hover:shadow-sm transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.code ?? ""}</p>
                </div>
                <div className="text-sm text-gray-600">
                  {s.components?.length ?? 0} units
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-600">
                {/* Show only first 4 units */}
                {s.components?.slice(0, 4).join(", ")}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center text-gray-500 py-6">
              No courses found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
