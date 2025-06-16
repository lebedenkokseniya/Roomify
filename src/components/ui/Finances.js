import React from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const incomeData = [
  { name: "Січ", доходи: 5000, витрати: 1500 },
  { name: "Лют", доходи: 7000, витрати: 2500 },
  { name: "Бер", доходи: 9000, витрати: 3000 },
  { name: "Кві", доходи: 8000, витрати: 2500 },
  { name: "Тра", доходи: 9500, витрати: 4000 },
];

export default function Finances() {
  return (
    <div className="space-y-6">
      <div className="p-4 border rounded shadow">
        <h2 className="font-semibold mb-2">Щомісячні доходи</h2>
        <BarChart width={350} height={200} data={incomeData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="доходи" fill="#4CAF50" />
        </BarChart>
      </div>

      <div className="p-4 border rounded shadow">
        <h2 className="font-semibold mb-2">Доходи проти витрат</h2>
        <LineChart width={350} height={200} data={incomeData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="доходи" stroke="#4CAF50" />
          <Line type="monotone" dataKey="витрати" stroke="#F44336" />
        </LineChart>
      </div>

      <div className="p-4 border rounded shadow">
        <h2 className="font-semibold">Фінансове зведення</h2>
        <ul className="list-disc pl-5 text-sm">
          <li>Загальний прибуток за рік: $98,000</li>
          <li>Середні витрати на місяць: $2,400</li>
          <li>Очікуваний дохід наступного місяця: $11,000</li>
        </ul>
      </div>
    </div>
  );
}
