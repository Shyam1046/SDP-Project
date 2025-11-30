// src/pages/academics/Attendance.jsx
import React, { useRef, useMemo, useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { AlertTriangle } from "lucide-react";

// register Chart.js pieces (safe to call repeatedly)
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Attendance({ data = null }) {
  // If parent passes `data.subjects` use it; otherwise use demo subjects.
  // Demo attendance values are generated once (useMemo) so they don't change every render.
  const demoSubjects = useMemo(() => {
    const base = [
      { id: "os", name: "Operating Systems", code: "CS401", components: ["Process Mgmt", "Memory Mgmt", "File System"] },
      { id: "dbms", name: "Database Management Systems", code: "CS402", components: ["ER Diagrams", "SQL", "Indexing"] },
      { id: "aiml", name: "AI & Machine Learning", code: "CS403", components: ["Preprocessing", "NN", "Evaluation"] },
      { id: "fedf", name: "Front-End Development", code: "CS404", components: ["HTML/CSS", "React", "Routing"] },
      { id: "oop", name: "Object-Oriented Programming", code: "CS405", components: ["Classes", "Inheritance", "Polymorphism"] },
    ];

    // Attach a random attendance between 60 and 95 for demo
    return base.map((s) => ({
      ...s,
      attendance: Math.floor(Math.random() * (95 - 60 + 1)) + 60,
    }));
  }, []);

  const subjects = (data?.subjects && data.subjects.length > 0) ? data.subjects : demoSubjects;

  const chartRef = useRef(null);
  const [selected, setSelected] = useState(subjects[0]?.id ?? null);

  // ensure selection stays valid if subjects change
  useEffect(() => {
    if (subjects.length && !subjects.find((s) => s.id === selected)) {
      setSelected(subjects[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjects]);

  // build chart data
  const chartData = useMemo(() => {
    const labels = subjects.map((s) => s.name);
    const values = subjects.map((s) => Number(s.attendance) || 0);
    const palette = ["#6366f1", "#06b6d4", "#f97316", "#10b981", "#ef4444", "#a78bfa", "#f43f5e"];
    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: palette.slice(0, labels.length),
          hoverOffset: 8,
          borderWidth: 0,
        },
      ],
    };
  }, [subjects]);

  const handleChartClick = (event) => {
    try {
      if (!chartRef.current) return;
      // For react-chartjs-2 v4, chartRef.current is the chart instance
      const nativeEvent = event?.nativeEvent ?? event;
      const points = chartRef.current.getElementsAtEventForMode
        ? chartRef.current.getElementsAtEventForMode(nativeEvent, "nearest", { intersect: true }, true)
        : [];
      if (points && points.length > 0) {
        const idx = points[0].index;
        const subj = subjects[idx];
        if (subj) setSelected(subj.id);
      }
    } catch (err) {
      console.error("chart click error:", err);
    }
  };

  const selectedSubject = subjects.find((s) => s.id === selected) ?? null;

  const getStatus = (attendance) => {
    const n = Number(attendance) || 0;
    if (n >= 85) return { label: "Excellent", badge: "bg-green-50 text-green-700" };
    if (n >= 75) return { label: "Good", badge: "bg-blue-50 text-blue-700" };
    if (n >= 70) return { label: "Warning", badge: "bg-yellow-50 text-yellow-700" };
    return { label: "Critical", badge: "bg-red-50 text-red-700" };
  };

  if (!subjects || subjects.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg border shadow-sm">
        <div className="text-center text-gray-600">
          <AlertTriangle className="w-10 h-10 mx-auto mb-2 text-amber-500" />
          <div>No attendance data available.</div>
          <div className="text-xs mt-1">Pass `data.subjects` to Academics or add data source.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Chart card */}
      <div className="bg-white rounded-2xl p-6 border shadow-sm">
        <h2 className="text-lg font-bold mb-2">Attendance</h2>
        <p className="text-sm text-gray-500 mb-4">Subject-wise attendance distribution. Click a slice to select.</p>

        <div className="max-w-md mx-auto" style={{ height: 280 }}>
          <Pie
            ref={chartRef}
            data={chartData}
            onClick={handleChartClick}
            options={{
              plugins: { legend: { display: true, position: "bottom" } },
              maintainAspectRatio: false,
            }}
          />
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">Tip: click a pie slice or a subject below to view details</div>
      </div>

      {/* Selected subject */}
      <div className="bg-white rounded-2xl p-6 border shadow-sm">
        <h3 className="text-md font-semibold mb-3">Selected Subject</h3>

        {selectedSubject ? (
          <>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{selectedSubject.name}</div>
                <div className="text-xs text-gray-500">{selectedSubject.code ?? ""}</div>
              </div>
              <div className="text-right">
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatus(selectedSubject.attendance).badge}`}>
                  {getStatus(selectedSubject.attendance).label}
                </div>
                <div className="text-sm font-bold mt-1">{selectedSubject.attendance}%</div>
              </div>
            </div>

            <div className="mt-3">
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${selectedSubject.attendance}%` }} />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>{selectedSubject.attendance}%</span>
                <span>{selectedSubject.components?.length ?? 0} units</span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-gray-500">No subject selected</div>
        )}
      </div>

      {/* All subjects */}
      <div className="bg-white rounded-2xl p-6 border shadow-sm">
        <h3 className="text-md font-semibold mb-3">All Subjects</h3>
        <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
          {subjects.map((s) => {
            const st = getStatus(s.attendance);
            return (
              <li key={s.id} className="p-3 border rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.code ?? ""}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded ${st.badge}`}>{st.label}</span>
                  <button onClick={() => setSelected(s.id)} className="px-3 py-1 bg-indigo-600 text-white rounded">
                    Select
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
