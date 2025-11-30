// src/pages/finance/PendingDues.jsx
import React from "react";

export default function PendingDues({ data = null }) {
  // Aggregate pending dues from feeBreakdown if provided, otherwise demo
  const feeBreakdown = data?.feeBreakdown ?? [
    { id: "tuition", label: "Tuition Fees", amount: 70000, paid: 45000, dueDate: "2025-12-01" },
    { id: "hostel", label: "Hostel Fees", amount: 15000, paid: 10000, dueDate: "2025-10-15" },
    { id: "exams", label: "Exam Fees", amount: 10000, paid: 0, dueDate: "2025-11-01" },
  ];

  const pendingList = feeBreakdown
    .map(f => ({ ...f, pending: f.amount - f.paid }))
    .filter(f => f.pending > 0)
    .sort((a, b) => new Date(a.dueDate || "2100-01-01") - new Date(b.dueDate || "2100-01-01"));

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 border shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Pending Dues</h3>

        <div className="space-y-3">
          {pendingList.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50">
              <div>
                <p className="font-semibold">{p.label}</p>
                <p className="text-xs text-gray-600">Due: {new Date(p.dueDate).toLocaleDateString()}</p>
                <p className="text-xs text-gray-500 mt-1">Amount due: ₹{p.pending.toLocaleString()}</p>
              </div>

              <div className="text-right">
                <a
                  href="/payment"
                  className="inline-block px-3 py-1 rounded bg-indigo-600 text-white text-sm"
                >
                  Pay Now
                </a>
              </div>
            </div>
          ))}

          {pendingList.length === 0 && (
            <div className="text-center text-gray-500 py-6">No pending dues. All paid!</div>
          )}
        </div>
      </div>
    </div>
  );
}
