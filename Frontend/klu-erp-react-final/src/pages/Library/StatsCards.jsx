// src/pages/library/StatsCards.jsx
import React from "react";

const stats = [
  { id: 1, label: "Total Books", value: 12480 },
  { id: 2, label: "Active Members", value: 2380 },
  { id: 3, label: "E-Resources", value: 820 },
  { id: 4, label: "Books Borrowed Today", value: 56 }
];

export default function StatsCards() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Library Stats</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.id} className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-2xl font-semibold mt-2">{s.value.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
