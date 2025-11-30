// src/pages/finance/index.jsx
import React from "react";
import { NavLink, useSearchParams } from "react-router-dom";

// IMPORTANT: ensure these files exist and are exported as default:
// ./Overview.jsx, ./FeeDetails.jsx, ./PaymentHistory.jsx, ./PendingDues.jsx, ./Receipts.jsx
import Overview from "./Overview";
import FeeDetails from "./FeeDetails";
import PaymentHistory from "./PaymentHistory";
import PendingDues from "./PendingDues";
import Receipts from "./Receipts";

const tabs = [
  { id: "overview", label: "Overview", to: "/finance?tab=overview" },
  { id: "fees", label: "Fee Details", to: "/finance?tab=fees" },
  { id: "history", label: "Payment History", to: "/finance?tab=history" },
  { id: "pending", label: "Pending Dues", to: "/finance?tab=pending" },
  { id: "receipts", label: "Receipts", to: "/finance?tab=receipts" },
];

export default function FinancePage({ data = null }) {
  const [search] = useSearchParams();
  const tab = (search.get("tab") || "overview").toLowerCase();

  // helper to decide active styling (explicit based on search param)
  const isTabActive = (id) => id === tab;

  return (
    <main className="min-h-screen bg-white p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Finance</h1>
        <p className="text-sm text-gray-600 mt-1">Fees, payments and receipts</p>
      </header>

      <nav className="mb-6">
        <ul className="flex gap-2 flex-wrap">
          {tabs.map((t) => (
            <li key={t.id}>
              <NavLink
                to={t.to}
                // explicit activeClass based on query param so search-specific tabs work
                className={() =>
                  `inline-flex items-center px-4 py-2 rounded-lg border transition ${
                    isTabActive(t.id)
                      ? "bg-indigo-600 text-white border-indigo-600 shadow"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`
                }
              >
                {t.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <section>
        {tab === "overview" && <Overview data={data} />}
        {tab === "fees" && <FeeDetails data={data} />}
        {tab === "history" && <PaymentHistory data={data} />}
        {tab === "pending" && <PendingDues data={data} />}
        {tab === "receipts" && <Receipts data={data} />}
      </section>
    </main>
  );
}
