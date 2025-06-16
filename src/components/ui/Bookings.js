import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

// Запасні дефолтні дані
const defaultSummary = [
  { label: "Всього бронювань", value: 1200 },
  { label: "Активні бронювання", value: 700 },
  { label: "Скасовані", value: 150 },
];

const defaultMonthly = [
  { month: "Січ", count: 100 },
  { month: "Лют", count: 150 },
  { month: "Бер", count: 130 },
  { month: "Кві", count: 170 },
  { month: "Тра", count: 200 },
];

const defaultStatus = [
  { name: "Оплачено", value: 60 },
  { name: "Очікує оплати", value: 30 },
  { name: "Скасовано", value: 10 },
];

export default function Bookings() {
  const [summary, setSummary] = useState(defaultSummary);
  const [monthly, setMonthly] = useState(defaultMonthly);
  const [status, setStatus] = useState(defaultStatus);

  useEffect(() => {
    async function fetchData() {
      try {
        const resSummary = await fetch("/api/bookings/stats");
        if (!resSummary.ok) throw new Error("Помилка відповіді");
        const dataSummary = await resSummary.json();

        const resMonthly = await fetch("/api/bookings/monthly");
        if (!resMonthly.ok) throw new Error("Помилка відповіді");
        const dataMonthly = await resMonthly.json();

        const resStatus = await fetch("/api/bookings/status");
        if (!resStatus.ok) throw new Error("Помилка відповіді");
        const dataStatus = await resStatus.json();

        setSummary(dataSummary);
        setMonthly(dataMonthly);
        setStatus(dataStatus);
      } catch (error) {
        console.warn("Не вдалось завантажити дані, використано дефолтні.", error);
        // Залишаємо дефолтні дані
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Статистика бронювань</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summary.map((item, idx) => (
          <div key={idx} className="p-4 border rounded shadow text-center bg-white">
            <div className="text-3xl font-bold">{item.value}</div>
            <div className="text-sm text-gray-600 mt-1">{item.label}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded shadow bg-white">
          <h2 className="font-semibold mb-2">Бронювання по місяцях</h2>
          <BarChart width={400} height={250} data={monthly}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>

        <div className="p-4 border rounded shadow bg-white">
          <h2 className="font-semibold mb-2">Статуси бронювань</h2>
          <PieChart width={400} height={250}>
            <Pie
              data={status}
              cx={200}
              cy={125}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {status.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </section>
    </div>
  );
}
