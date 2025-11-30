// src/pages/academics/index.jsx
import React from "react";
import { NavLink, useSearchParams } from "react-router-dom";

import StatsOverview from "./academic/StatsOverview";
import Attendance from "./academic/Attendance";
import Courses from "./academic/Courses";
import Performance from "./academic/Performance";
import Schedule from "./academic/Schedule";

const tabs = [
  { id: "overview", label: "Overview", to: "/academics?tab=overview" },
  { id: "attendance", label: "Attendance", to: "/academics?tab=attendance" },
  { id: "courses", label: "Course Details", to: "/academics?tab=courses" },
  { id: "performance", label: "Performance", to: "/academics?tab=performance" },
  { id: "schedule", label: "Schedule", to: "/academics?tab=schedule" },
];

export default function AcademicsPage({ data = null }) {
  const [search] = useSearchParams();
  const tab = search.get("tab") || "overview";

  // pass data into subpages so they can render real content or default data
  const subjects = data?.subjects ?? undefined;

  return (
    <main className="min-h-screen bg-white p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Academics</h1>
        <p className="text-sm text-gray-600 mt-1">Manage courses, attendance and performance</p>
      </header>

      

      {/* Content — only the active tab renders */}
      <section>
        {tab === "overview" && <StatsOverview data={data} />}
        {tab === "attendance" && <Attendance data={data} />}
        {tab === "courses" && <Courses data={data} />}
        {tab === "performance" && <Performance data={data} />}
        {tab === "schedule" && <Schedule data={data} />}
      </section>
    </main>
  );
}
