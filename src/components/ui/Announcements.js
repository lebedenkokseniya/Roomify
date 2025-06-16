import React from "react";

const announcements = [
  { id: 1, title: "Планове технічне обслуговування", date: "2025-06-20", message: "Сайт буде недоступний з 02:00 до 04:00 за Київським часом." },
  { id: 2, title: "Нова функція бронювання", date: "2025-06-15", message: "Додано можливість вибору додаткових послуг при бронюванні номера." },
  { id: 3, title: "Оновлення політики конфіденційності", date: "2025-06-01", message: "Перегляньте оновлену політику конфіденційності на сторінці з документами." }
];

export default function Announcements() {
  return (
    <div className="space-y-6">
      <div className="p-4 border rounded shadow">
        <h2 className="font-semibold mb-4">Оголошення</h2>
        <ul className="space-y-4">
          {announcements.map(item => (
            <li key={item.id} className="p-4 border rounded hover:shadow-md">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.date}</p>
              <p className="mt-2 text-sm">{item.message}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
