// src/pages/academics/Schedule.jsx
import React from "react";

export default function Schedule({ data = null }) {
  const schedule = data?.schedule ?? [
    {
      day: "Monday",
      classes: [
        { name: "Operating Systems", time: "9:00 AM - 10:30 AM" },
        { name: "AI & ML", time: "11:00 AM - 12:30 PM" },
        { name: "DBMS Lab", time: "2:00 PM - 4:00 PM" },
      ],
    },
    {
      day: "Tuesday",
      classes: [
        { name: "DBMS", time: "9:00 AM - 10:30 AM" },
        { name: "OOP", time: "11:00 AM - 12:30 PM" },
        { name: "FEDF", time: "3:00 PM - 4:30 PM" },
      ],
    },
    {
      day: "Wednesday",
      classes: [
        { name: "AI & ML", time: "9:00 AM - 10:30 AM" },
        { name: "Operating Systems", time: "11:00 AM - 12:30 PM" },
        { name: "OOP Lab", time: "2:00 PM - 4:00 PM" },
      ],
    },
    {
      day: "Thursday",
      classes: [
        { name: "FEDF", time: "9:00 AM - 10:30 AM" },
        { name: "DBMS", time: "11:00 AM - 12:30 PM" },
        { name: "AI Workshop", time: "3:00 PM - 4:30 PM" },
      ],
    },
    {
      day: "Friday",
      classes: [
        { name: "OOP", time: "9:00 AM - 10:30 AM" },
        { name: "FEDF Lab", time: "11:00 AM - 1:00 PM" },
        { name: "Mini Project", time: "2:00 PM - 3:30 PM" },
      ],
    },
    {
      day: "Saturday",
      classes: [
        { name: "Guest Lecture", time: "10:00 AM - 12:00 PM" },
        { name: "Seminar / Workshops", time: "2:00 PM - 3:30 PM" },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-6 border shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Weekly Schedule</h2>

        <div className="space-y-4">
          {schedule.map((d, i) => (
            <div key={i} className="p-4 border rounded-xl hover:shadow-sm transition">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-indigo-700">{d.day}</p>
              </div>

              <div className="text-sm text-gray-700 space-y-1">
                {d.classes.map((c, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-md border"
                  >
                    <span className="font-medium">{c.name}</span>
                    <span className="text-xs text-gray-600">{c.time}</span>
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
