// src/pages/finance/Receipts.jsx
import React from "react";

export default function Receipts({ data = null }) {
  const receipts = data?.receipts ?? [
    { id: "RCPT-20250915-001", date: "2025-09-15", amount: 30000, type: "Tuition" },
    { id: "RCPT-20250810-002", date: "2025-08-10", amount: 25000, type: "Hostel" },
    { id: "RCPT-20250702-003", date: "2025-07-02", amount: 15000, type: "Tuition" },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 border shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Receipts</h3>

        <div className="space-y-3">
          {receipts.map((r) => (
            <div key={r.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
              <div>
                <p className="font-semibold">{r.type} • ₹{r.amount.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(r.date).toLocaleDateString()} • {r.id}</p>
              </div>
              <div>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert('Download stub: ' + r.id); }}
                  className="text-indigo-600 text-sm font-semibold"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
