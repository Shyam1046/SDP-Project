// src/pages/exams/Schedule.jsx
import React from "react";

export default function Schedule({ data = null }) {
  const schedule =
    data?.schedule ?? [
      { date: "2025-11-02", exams: [{ subject: "Data Structures", time: "10:00 AM - 1:00 PM", venue: "Hall A" }, { subject: "Maths", time: "2:00 PM - 4:00 PM", venue: "Hall A" }] },
      { date: "2025-11-06", exams: [{ subject: "DBMS", time: "2:00 PM - 4:00 PM", venue: "Hall B" }] },
      { date: "2025-11-12", exams: [{ subject: "Operating Systems", time: "9:00 AM - 12:00 PM", venue: "Hall C" }] },
      { date: "2025-11-18", exams: [{ subject: "Web Technologies", time: "11:00 AM - 1:00 PM", venue: "Lab 2" }] },
    ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Exam Schedule</h3>
        <div className="space-y-3">
          {schedule.map((day, idx) => (
            <div key={idx} className="p-3 border rounded-lg bg-gray-50">
              <p className="font-semibold text-indigo-700 mb-2">{new Date(day.date).toLocaleDateString()}</p>
              <div className="space-y-2">
                {day.exams.map((ex, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-white rounded-md border">
                    <div>
                      <p className="font-medium">{ex.subject}</p>
                      <p className="text-xs text-gray-500">{ex.venue}</p>
                    </div>
                    <div className="text-sm text-gray-700">{ex.time}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
