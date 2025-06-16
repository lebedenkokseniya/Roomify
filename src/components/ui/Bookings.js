import React from "react";

const bookings = [
  { id: 1, user: "Іван Іванов", room: "101", date: "2025-06-16", status: "оплачено" },
  { id: 2, user: "Марія Котик", room: "102", date: "2025-06-17", status: "очікує" },
  { id: 3, user: "Олег Паляниця", room: "201", date: "2025-06-18", status: "скасовано" },
];

export default function Bookings() {
  return (
    <div className="space-y-6">
      <div className="p-4 border rounded shadow">
        <h2 className="font-semibold mb-4">Список бронювань</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Користувач</th>
              <th className="text-left p-2">Кімната</th>
              <th className="text-left p-2">Дата</th>
              <th className="text-left p-2">Статус</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id} className="border-b">
                <td className="p-2">{b.user}</td>
                <td className="p-2">{b.room}</td>
                <td className="p-2">{b.date}</td>
                <td className="p-2 capitalize">{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
