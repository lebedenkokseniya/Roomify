import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const DEFAULT_SUMMARY = [
  { label: "Нові бронювання", value: 0 },
  { label: "Актив. перебувань", value: 0 },
  { label: "Заселилося", value: 0 },
  { label: "Виселилося", value: 0 },
  { label: "Дохід за сьогодні", value: "$0" },
  { label: "Нових юзерів", value: 0 },
];

const DEFAULT_INCOME = [
  { name: "Січ", income: 0, expense: 0 },
  { name: "Лют", income: 0, expense: 0 },
  { name: "Бер", income: 0, expense: 0 },
  { name: "Кві", income: 0, expense: 0 },
  { name: "Тра", income: 0, expense: 0 },
];

const DEFAULT_PIE = [
  { name: "Оплачено", value: 0 },
  { name: "Очікує оплати", value: 0 },
  { name: "Скасовано", value: 0 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function Dashboard() {
  const [summaryData, setSummaryData] = useState(DEFAULT_SUMMARY);
  const [incomeData, setIncomeData] = useState(DEFAULT_INCOME);
  const [pieData, setPieData] = useState(DEFAULT_PIE);

  useEffect(() => {
    fetch("/api/dashboard/summary")
      .then((res) => res.json())
      .then((data) => setSummaryData(data))
      .catch(() => setSummaryData(DEFAULT_SUMMARY));

    fetch("/api/dashboard/income")
      .then((res) => res.json())
      .then((data) => setIncomeData(data))
      .catch(() => setIncomeData(DEFAULT_INCOME));

    fetch("/api/dashboard/pie")
      .then((res) => res.json())
      .then((data) => setPieData(data))
      .catch(() => setPieData(DEFAULT_PIE));
  }, []);

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {summaryData.map((item, index) => (
          <div key={index} className="p-4 border rounded shadow text-center">
            <div className="text-2xl font-bold">{item.value}</div>
            <div className="text-sm text-gray-600">{item.label}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded shadow">
          <h2 className="font-semibold mb-2">Доходи та витрати</h2>
          <LineChart width={300} height={200} data={incomeData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="income" stroke="#8884d8" />
            <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
          </LineChart>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="font-semibold mb-2">Доходи по місяцях</h2>
          <BarChart width={300} height={200} data={incomeData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="income" fill="#8884d8" />
          </BarChart>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded shadow">
          <h2 className="font-semibold mb-2">Статуси бронювань</h2>
          <PieChart width={300} height={200}>
            <Pie data={pieData} cx={150} cy={100} outerRadius={80} fill="#8884d8" dataKey="value">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="p-4 border rounded shadow space-y-4">
          <div>
            <h3 className="font-semibold">Актуальна інформація</h3>
            <p className="text-sm">На наступний тиждень заброньовано 94 об'єкти</p>
          </div>
          <div>
            <h3 className="font-semibold">Бронювань за останній тиждень</h3>
            <p className="text-2xl">783</p>
          </div>
        </div>
      </section>
    </div>
  );
}