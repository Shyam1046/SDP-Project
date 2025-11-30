// src/pages/Library/Library.jsx
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BookMarked, BookOpen, FileText, Layers, Navigation } from "lucide-react";

// Subpages / components (ensure these files exist)
import BorrowedBooks from "./BorrowedBooks";
import EBooks from "./EBooks";
import Guidelines from "./Guidelines";
import QuickActions from "./QuickActions";
import StatsCards from "./StatsCards";

export default function Library({ data = null }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "overview";

  const handleTab = (t) => setSearchParams({ tab: t });

  const tabs = [
    { id: "overview", label: "Overview", icon: Navigation },
    { id: "borrowed", label: "Borrowed Books", icon: BookOpen },
    { id: "ebooks", label: "E-Books", icon: Layers },
    { id: "guidelines", label: "Guidelines", icon: FileText },
    { id: "actions", label: "Quick Actions", icon: BookMarked },
  ];

  return (
    <main className="min-h-screen bg-white p-6">
      {/* Page Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Library</h1>
        <p className="text-gray-600">Browse, borrow and access academic resources</p>
      </header>

      {/* Quick Links Grid */}
      <section className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Link
            to="?tab=borrowed"
            className="p-5 bg-white shadow rounded-lg hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">Borrowed Books</h3>
            <p className="text-sm text-gray-600 mt-2">Track books you've borrowed and due dates</p>
          </Link>

          <Link
            to="?tab=ebooks"
            className="p-5 bg-white shadow rounded-lg hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">E-Books</h3>
            <p className="text-sm text-gray-600 mt-2">Browse and download available e-resources</p>
          </Link>

          <Link
            to="?tab=guidelines"
            className="p-5 bg-white shadow rounded-lg hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">Guidelines</h3>
            <p className="text-sm text-gray-600 mt-2">Library policies, borrowing rules and fines</p>
          </Link>

          <Link
            to="?tab=actions"
            className="p-5 bg-white shadow rounded-lg hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <p className="text-sm text-gray-600 mt-2">Reserve, renew, request procurement</p>
          </Link>

          <Link
            to="?tab=overview"
            className="p-5 bg-white shadow rounded-lg hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">Stats</h3>
            <p className="text-sm text-gray-600 mt-2">Library usage and popular titles</p>
          </Link>
        </div>
      </section>

      {/* Tabs */}
      <section>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleTab(t.id)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all whitespace-nowrap ${
                  active
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div>
          {tab === "overview" && <StatsCards data={data} />}
          {tab === "borrowed" && <BorrowedBooks data={data} />}
          {tab === "ebooks" && <EBooks data={data} />}
          {tab === "guidelines" && <Guidelines data={data} />}
          {tab === "actions" && <QuickActions data={data} />}
        </div>
      </section>
    </main>
  );
}
