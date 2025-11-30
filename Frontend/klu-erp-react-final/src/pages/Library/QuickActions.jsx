// src/pages/library/QuickActions.jsx
import React from "react";

export default function QuickActions() {
  const actions = [
    { id: "reserve", label: "Reserve a Book", hint: "Place a hold for pickup" },
    { id: "renew", label: "Renew Borrowed Book", hint: "Extend loan period" },
    { id: "request", label: "Request Purchase", hint: "Suggest titles for procurement" },
    { id: "report", label: "Report Issue", hint: "Damaged/missing material" }
  ];

  const handleAction = (id) => {
    // placeholder - integrate with backend
    alert(`Action triggered: ${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((a) => (
          <div key={a.id} className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">{a.label}</p>
              <p className="text-sm text-gray-600">{a.hint}</p>
            </div>

            <button
              onClick={() => handleAction(a.id)}
              className="px-3 py-1 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700"
            >
              Go
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
