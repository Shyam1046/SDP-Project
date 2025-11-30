// src/pages/library/Guidelines.jsx
import React from "react";

const rules = [
  { id: 1, title: "Loan Periods", desc: "Undergraduate: 14 days. Postgraduate: 28 days. Renewals permitted if no holds." },
  { id: 2, title: "Fines", desc: "Late return fine applies per day per book. Replacement cost for lost/damaged items." },
  { id: 3, title: "Behavior", desc: "Maintain silence, no food/drinks, mobile phones on silent." },
  { id: 4, title: "Access", desc: "Library card required for entry and borrowing. Guest access by request." }
];

export default function Guidelines() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Library Guidelines</h2>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        {rules.map((r) => (
          <div key={r.id}>
            <h3 className="font-semibold">{r.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
