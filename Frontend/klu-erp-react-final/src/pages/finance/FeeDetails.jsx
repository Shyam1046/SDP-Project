// src/pages/finance/FeeDetails.jsx
import React, { useState } from "react";

export default function FeeDetails({ data = null }) {
  const [selected, setSelected] = useState(null);

  const feeBreakdown = data?.feeBreakdown ?? [
    { id: "tuition", label: "Tuition Fees", amount: 70000, paid: 45000, dueDate: "2025-12-01", color: "indigo" },
    { id: "hostel", label: "Hostel Fees", amount: 15000, paid: 10000, dueDate: "2025-10-15", color: "green" },
    { id: "sports", label: "Sports Fees", amount: 5000, paid: 5000, dueDate: null, color: "blue" },
    { id: "exams", label: "Exam Fees", amount: 10000, paid: 0, dueDate: "2025-11-01", color: "orange" },
  ];

  const getColor = (c) => {
    const map = {
      indigo: "from-indigo-400 to-indigo-600",
      green: "from-green-400 to-green-600",
      blue: "from-blue-400 to-blue-600",
      orange: "from-orange-400 to-orange-600",
    };
    return map[c] || map.indigo;
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-6 border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Fee Details</h3>

        <div className="grid grid-cols-1 gap-4">
          {feeBreakdown.map((f) => {
            const done = Math.round((f.paid / f.amount) * 100);
            const pending = f.amount - f.paid;
            return (
              <div
                key={f.id}
                className="p-4 border rounded-xl bg-white hover:shadow-sm transition cursor-pointer"
                onClick={() => setSelected(f.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{f.label}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      ₹{f.paid.toLocaleString()} paid • ₹{f.amount.toLocaleString()} total
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold">₹{f.amount.toLocaleString()}</p>
                    {pending > 0 ? (
                      <p className="text-xs text-orange-600">₹{pending.toLocaleString()} due</p>
                    ) : (
                      <p className="text-xs text-green-600">Paid</p>
                    )}
                    {f.dueDate && <p className="text-xs text-gray-500 mt-1">Due: {new Date(f.dueDate).toLocaleDateString()}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${getColor(f.color)}`}
                      style={{ width: `${done}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-600 min-w-[50px] text-right">{done}%</div>
                </div>
              </div>
            );
          })}
        </div>

        {selected && (
          <div className="mt-4 p-4 border rounded-xl bg-gray-50">
            <p className="text-sm">Details for <strong>{feeBreakdown.find(x => x.id === selected)?.label}</strong></p>
            <p className="text-xs text-gray-500 mt-2">Invoice downloads, due dates and payment options will show here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
