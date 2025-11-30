// src/pages/exams/index.jsx
import React from "react";
import { NavLink, useSearchParams } from "react-router-dom";

import Upcoming from "./upcoming";
import Results from "./Results";
import Schedule from "./Schedule";
import HallTickets from "./HallTickets";
import GradeHistory from "./GradeHistory";

const tabs = [
  { id: "upcoming", label: "Upcoming Exams", to: "/exams?tab=upcoming" },
  { id: "results", label: "Results", to: "/exams?tab=results" },
  { id: "schedule", label: "Exam Schedule", to: "/exams?tab=schedule" },
  { id: "halltickets", label: "Hall Tickets", to: "/exams?tab=halltickets" },
  { id: "grades", label: "Grade History", to: "/exams?tab=grades" },
];

export default function Exams({ data = null }) {
  const [search] = useSearchParams();
  const tab = (search.get("tab") || "upcoming").toLowerCase();

  const isTabActive = (id) => id === tab;

  return (
    <main className="min-h-screen bg-white p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Exams & Results</h1>
        <p className="text-sm text-gray-600 mt-1">Manage registrations, view schedules and download hall tickets</p>
      </header>

      <nav className="mb-6">
        <ul className="flex gap-2 flex-wrap">
          {tabs.map((t) => (
            <li key={t.id}>
              <NavLink
                to={t.to}
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
        {tab === "upcoming" && <Upcoming data={data} />}
        {tab === "results" && <Results data={data} />}
        {tab === "schedule" && <Schedule data={data} />}
        {tab === "halltickets" && <HallTickets data={data} />}
        {tab === "grades" && <GradeHistory data={data} />}
      </section>
    </main>
  );
}
