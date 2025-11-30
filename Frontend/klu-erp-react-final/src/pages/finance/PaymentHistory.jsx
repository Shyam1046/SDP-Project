// src/pages/finance/PaymentHistory.jsx
import React from "react";

export default function PaymentHistory({ data = null }) {
  const paymentHistory = data?.paymentHistory ?? [
    { date: "2025-09-15", amount: 30000, method: "UPI", status: "Completed", receiptId: "RCPT-20250915-001" },
    { date: "2025-08-10", amount: 25000, method: "Card", status: "Completed", receiptId: "RCPT-20250810-002" },
    { date: "2025-07-02", amount: 15000, method: "Netbanking", status: "Completed", receiptId: "RCPT-20250702-003" },
    { date: "2025-05-18", amount: 12000, method: "UPI", status: "Completed", receiptId: "RCPT-20250518-004" },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 border shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Payment History</h3>
        <div className="space-y-3">
          {paymentHistory.map((p, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
              <div>
                <p className="font-semibold">₹{p.amount.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(p.date).toLocaleDateString()} • {p.method}</p>
                <p className="text-xs text-gray-400 mt-1">Receipt: {p.receiptId}</p>
              </div>
              <div>
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
