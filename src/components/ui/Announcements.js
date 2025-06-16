import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const defaultStats = [
  { label: "Всього оголошень", value: 58 },
  { label: "Активні", value: 43 },
  { label: "В архіві", value: 15 },
];

const defaultByType = [
  { name: "Технічні", value: 22 },
  { name: "Оновлення", value: 18 },
  { name: "Інші", value: 18 },
];

const COLORS = ["#82ca9d", "#8884d8", "#ffc658"];

export default function Announcements() {
  const [stats, setStats] = useState(defaultStats);
  const [byType, setByType] = useState(defaultByType);

  useEffect(() => {
    async function fetchData() {
      try {
        const resStats = await fetch("/api/announcements/stats");
        if (!resStats.ok) throw new Error("Failed to fetch stats");
        const dataStats = await resStats.json();

        const resTypes = await fetch("/api/announcements/types");
        if (!resTypes.ok) throw new Error("Failed to fetch types");
        const dataTypes = await resTypes.json();

        setStats(dataStats);
        setByType(dataTypes);
      } catch (err) {
        console.warn("Не вдалося завантажити статистику оголошень. Використовуються дефолтні значення.", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Аналітика оголошень</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item, idx) => (
          <div key={idx} className="p-4 border rounded shadow text-center bg-white">
            <div className="text-3xl font-bold">{item.value}</div>
            <div className="text-sm text-gray-600 mt-1">{item.label}</div>
          </div>
        ))}
      </section>

      <section className="p-4 border rounded shadow bg-white max-w-md mx-auto">
        <h2 className="font-semibold mb-2">Типи оголошень</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={byType}
            cx={200}
            cy={150}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {byType.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </section>
    </div>
  );
}