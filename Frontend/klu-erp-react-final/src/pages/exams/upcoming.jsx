// src/pages/exams/Upcoming.jsx
import React, { useState } from "react";
import { Calendar, Clock } from "lucide-react";

export default function upcoming({ data = null }) {
  const upcomingExams =
    data?.upcomingExams ?? [
      { id: "ex1", subject: "Data Structures", date: "2025-11-02", time: "10:00 AM", venue: "Hall A", duration: "3 hours", registered: false },
      { id: "ex2", subject: "DBMS", date: "2025-11-06", time: "2:00 PM", venue: "Hall B", duration: "2 hours", registered: true },
      { id: "ex3", subject: "Operating Systems", date: "2025-11-12", time: "9:00 AM", venue: "Hall C", duration: "3 hours", registered: false },
      { id: "ex4", subject: "Web Technologies", date: "2025-11-18", time: "11:00 AM", venue: "Lab 2", duration: "2 hours", registered: true },
    ];

  const [exams, setExams] = useState(upcomingExams);

  const toggleRegister = (id) => {
    setExams((prev) => prev.map(e => e.id === id ? { ...e, registered: !e.registered } : e));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {exams.map((e) => {
          const daysLeft = Math.ceil((new Date(e.date) - new Date()) / (1000 * 60 * 60 * 24));
          return (
            <div key={e.id} className="p-4 border rounded-xl bg-white hover:shadow-sm transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-lg">{e.subject}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
                    <Calendar className="w-4 h-4" /> 
                    <span>{new Date(e.date).toLocaleDateString()}</span>
                    <Clock className="w-4 h-4" />
                    <span>{e.time} • {e.duration}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Venue: {e.venue}</p>
                </div>

                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${daysLeft <= 2 ? "bg-red-100 text-red-700" : daysLeft <= 7 ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}>
                    {daysLeft <= 0 ? "Today" : daysLeft === 1 ? "Tomorrow" : `${daysLeft} days`}
                  </div>
                  <button
                    onClick={() => toggleRegister(e.id)}
                    className={`mt-3 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                      e.registered ? "bg-gray-200 text-gray-800" : "bg-indigo-600 text-white"
                    }`}
                  >
                    {e.registered ? "Registered" : "Register"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
