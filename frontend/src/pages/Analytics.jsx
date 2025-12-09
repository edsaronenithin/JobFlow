// src/pages/Analytics.jsx
import React, { useMemo } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const STORAGE_KEY = "jobflow_applications";
const COLORS = {
  applied: "#3b82f6", // blue-500
  interview: "#f59e0b", // yellow-500
  offered: "#10b981", // green-500
  other: "#a78bfa", // purple-300
};

function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function tryParseDate(value) {
  if (!value) return null;
  // Accept ISO yyyy-mm-dd or other parseable strings
  const isoMatch = /^\d{4}-\d{2}-\d{2}$/.test(value);
  const parsed = isoMatch ? new Date(value + "T00:00:00") : new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed;
}

export default function Analytics() {
  const apps = readFromStorage();

  // Basic counts
  const total = apps.length;
  const counts = useMemo(() => {
    const c = { Applied: 0, Interview: 0, Offered: 0, Other: 0 };
    apps.forEach((a) => {
      if (a.status === "Applied") c.Applied += 1;
      else if (a.status === "Interview") c.Interview += 1;
      else if (a.status === "Offered") c.Offered += 1;
      else c.Other += 1;
    });
    return c;
  }, [apps]);

  const successRate = total
    ? ((counts.Offered / total) * 100).toFixed(1)
    : "0.0";

  // Applications per month — last 6 months (dynamic)
  const perMonth = useMemo(() => {
    const months = []; // [{ label: 'Aug', key: '2025-08' }]
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = d.toLocaleString(undefined, { month: "short" });
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      months.push({ label, key, dateObj: d });
    }
    const map = months.map((m) => ({ ...m, count: 0 }));
    apps.forEach((a) => {
      const pd = tryParseDate(a.appliedDate);
      if (!pd) return;
      const key = `${pd.getFullYear()}-${String(pd.getMonth() + 1).padStart(2, "0")}`;
      const idx = map.findIndex((x) => x.key === key);
      if (idx >= 0) map[idx].count += 1;
    });
    return map; // array of 6 months with count
  }, [apps]);

  // Platform distribution
  const platformStats = useMemo(() => {
    const m = {};
    apps.forEach((a) => {
      const p = (a.platform || "Unknown").trim();
      m[p] = (m[p] || 0) + 1;
    });
    return Object.entries(m).map(([name, value]) => ({ name, value }));
  }, [apps]);

  // Status pie data for recharts
  const pieData = [
    { name: "Applied", value: counts.Applied, color: COLORS.applied },
    { name: "Interview", value: counts.Interview, color: COLORS.interview },
    { name: "Offered", value: counts.Offered, color: COLORS.offered },
    { name: "Other", value: counts.Other, color: COLORS.other },
  ];

  // Average time to offer (in days) when both appliedDate and offeredDate exist
  const avgTimeToOffer = useMemo(() => {
    const diffs = [];
    apps.forEach((a) => {
      if (!a.appliedDate || !a.offeredDate) return;
      const ad = tryParseDate(a.appliedDate);
      const od = tryParseDate(a.offeredDate);
      if (!ad || !od) return;
      const diffDays = Math.round(
        (od.getTime() - ad.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (!Number.isNaN(diffDays) && isFinite(diffDays)) diffs.push(diffDays);
    });
    if (!diffs.length) return null;
    const sum = diffs.reduce((s, v) => s + v, 0);
    return Math.round(sum / diffs.length);
  }, [apps]);

  // Helper to create percentages
  const pct = (value) =>
    total ? `${Math.round((value / total) * 100)}%` : "0%";

  // Responsive layout + Recharts visualization
  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen text-[#111827] dark:text-gray-300">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 ml-64">
          <Header />

          <div className="p-4 sm:p-6 lg:p-10">
            <div className="mx-auto max-w-7xl">
              {/* Header */}
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111418] dark:text-white">
                    Analytics Dashboard
                  </h1>
                  <p className="text-sm text-[#617589] dark:text-[#a0b3c6] mt-1">
                    Visualize your job application data and track your progress.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex gap-2">
                    <button className="flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-white">
                      <span className="material-symbols-outlined">
                        calendar_month
                      </span>
                      Last 30 Days
                    </button>
                    <button className="flex h-9 items-center gap-2 rounded-lg bg-white dark:bg-[#1a2734] px-3 border border-[#dbe0e6] dark:border-[#2a3947]">
                      Last 7 Days
                    </button>
                  </div>

                  {/* mobile compact */}
                  <div className="sm:hidden">
                    <button className="flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-white">
                      <span className="material-symbols-outlined">
                        calendar_month
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* KPI cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="rounded-xl p-4 border border-[#dbe0e6] dark:border-[#2a3947] bg-white dark:bg-[#1a2734]">
                  <p className="text-sm text-[#617589]">Total Applications</p>
                  <div className="mt-2 flex items-baseline justify-between">
                    <div className="text-2xl font-bold text-[#111418] dark:text-white">
                      {total}
                    </div>
                    <div className="text-sm text-[#078838]">
                      Applied: {counts.Applied}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl p-4 border border-[#dbe0e6] dark:border-[#2a3947] bg-white dark:bg-[#1a2734]">
                  <p className="text-sm text-[#617589]">Success Rate</p>
                  <div className="mt-2">
                    <div className="text-2xl font-bold text-[#111418] dark:text-white">
                      {successRate}%
                    </div>
                    <div className="text-sm text-[#617589] mt-1">
                      Offered: {counts.Offered} ({pct(counts.Offered)})
                    </div>
                  </div>
                </div>

                <div className="rounded-xl p-4 border border-[#dbe0e6] dark:border-[#2a3947] bg-white dark:bg-[#1a2734]">
                  <p className="text-sm text-[#617589]">Active Applications</p>
                  <div className="mt-2">
                    <div className="text-2xl font-bold text-[#111418] dark:text-white">
                      {total -
                        apps.filter((a) => a.status === "Rejected").length}
                    </div>
                    <div className="text-sm text-[#617589] mt-1">
                      Rejected:{" "}
                      {apps.filter((a) => a.status === "Rejected").length}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl p-4 border border-[#dbe0e6] dark:border-[#2a3947] bg-white dark:bg-[#1a2734]">
                  <p className="text-sm text-[#617589]">Avg Time to Offer</p>
                  <div className="mt-2">
                    <div className="text-2xl font-bold text-[#111418] dark:text-white">
                      {avgTimeToOffer === null ? "—" : `${avgTimeToOffer}d`}
                    </div>
                    <div className="text-sm text-[#617589] mt-1">
                      Based on offered items
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts area: bar + pie + platform */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Applications per month (bar) */}
                <div className="lg:col-span-2 rounded-xl p-4 border border-[#dbe0e6] dark:border-[#2a3947] bg-white dark:bg-[#1a2734]">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-semibold text-[#111418] dark:text-white">
                      Applications per Month
                    </h3>
                    <div className="text-sm text-[#617589]">
                      {perMonth.reduce((s, m) => s + m.count, 0)} total in shown
                      months
                    </div>
                  </div>

                  <div className="w-full" style={{ height: 220 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={perMonth.map((m) => ({
                          name: m.label,
                          count: m.count,
                        }))}
                      >
                        <XAxis dataKey="name" tick={{ fill: "#617589" }} />
                        <YAxis
                          allowDecimals={false}
                          tick={{ fill: "#617589" }}
                        />
                        <Tooltip />
                        <Bar
                          dataKey="count"
                          fill={COLORS.applied}
                          radius={[6, 6, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Status distribution (pie) & custom legend */}
                <div className="rounded-xl p-4 border border-[#dbe0e6] dark:border-[#2a3947] bg-white dark:bg-[#1a2734] flex flex-col">
                  <h3 className="text-base font-semibold text-[#111418] dark:text-white mb-2">
                    Status Distribution
                  </h3>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Pie (left) */}
                    <div style={{ width: 180, height: 180, minWidth: 160 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            innerRadius={48}
                            outerRadius={72}
                            dataKey="value"
                            label={false} // turn off labels rendered on the slices
                            legendType="circle"
                            startAngle={90}
                            endAngle={-270}
                          >
                            {pieData.map((entry, idx) => (
                              <Cell key={entry.name} fill={entry.color} />
                            ))}
                          </Pie>
                          {/* Don't use built-in Legend */}
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Custom legend (right) */}
                    <div className="flex-1 min-w-[220px]">
                      <ul className="space-y-3">
                        {pieData.map((p) => {
                          const percent = total
                            ? Math.round((p.value / total) * 100)
                            : 0;
                          return (
                            <li
                              key={p.name}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className="inline-block rounded-full"
                                  style={{
                                    width: 12,
                                    height: 12,
                                    background: p.color,
                                  }}
                                />
                                <div>
                                  <div className="text-sm font-medium text-[#111418] dark:text-white">
                                    {p.name}
                                  </div>
                                  <div className="text-xs text-[#617589]">
                                    {p.value} ({percent}%)
                                  </div>
                                </div>
                              </div>

                              <div className="text-sm font-semibold text-[#111418] dark:text-white">
                                {p.value}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Platforms breakdown */}
                <div className="lg:col-span-3 rounded-xl p-4 border border-[#dbe0e6] dark:border-[#2a3947] bg-white dark:bg-[#1a2734]">
                  <h3 className="text-base font-semibold text-[#111418] dark:text-white mb-3">
                    Applications by Platform
                  </h3>
                  <div className="space-y-3">
                    {platformStats.length === 0 ? (
                      <div className="text-sm text-[#617589]">No data</div>
                    ) : (
                      platformStats.map((p) => {
                        const percent = total
                          ? Math.round((p.value / total) * 100)
                          : 0;
                        return (
                          <div
                            key={p.name}
                            className="grid grid-cols-[auto_1fr_auto] items-center gap-4"
                          >
                            <div className="text-sm text-[#617589]">
                              {p.name}
                            </div>
                            <div className="h-2.5 w-full rounded-full bg-primary/20">
                              <div
                                className="h-full rounded-full bg-primary"
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                            <div className="text-sm font-semibold text-[#111418] dark:text-white">
                              {p.value} ({percent}%)
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
              {/* end charts area */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
