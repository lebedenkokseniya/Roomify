import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const defaultData = [
  { name: "Січ", доходи: 5000, витрати: 1500 },
  { name: "Лют", доходи: 7000, витрати: 2500 },
  { name: "Бер", доходи: 9000, витрати: 3000 },
  { name: "Кві", доходи: 8000, витрати: 2500 },
  { name: "Тра", доходи: 9500, витрати: 4000 },
];

export default function Finances() {
  const [incomeData, setIncomeData] = useState(defaultData);
  const [summary, setSummary] = useState({
    total: "$98,000",
    avgMonthly: "$2,400",
    nextExpected: "$11,000",
  });

  useEffect(() => {
    fetch("/api/finance")
      .then((res) => res.ok ? res.json() : Promise.reject("API error"))
      .then((data) => {
        setIncomeData(data.chart || defaultData);
        setSummary(data.summary || summary);
      })
      .catch(() => {
        console.warn("Не вдалося завантажити фінансові дані, використано дефолтні.");
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="p-4 border rounded shadow">
        <h2 className="font-semibold mb-2">Щомісячні доходи</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={incomeData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="доходи" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 border rounded shadow">
        <h2 className="font-semibold mb-2">Доходи проти витрат</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={incomeData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="доходи" stroke="#4CAF50" />
            <Line type="monotone" dataKey="витрати" stroke="#F44336" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 border rounded shadow">
        <h2 className="font-semibold">Фінансове зведення</h2>
        <ul className="list-disc pl-5 text-sm">
          <li>Загальний прибуток за рік: {summary.total}</li>
          <li>Середні витрати на місяць: {summary.avgMonthly}</li>
          <li>Очікуваний дохід наступного місяця: {summary.nextExpected}</li>
        </ul>
      </div>
    </div>
  );
}
