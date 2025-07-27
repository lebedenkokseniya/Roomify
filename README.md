# Roomify Admin Panel

Roomify Admin Panel is a React-based frontend for managing a room booking platform. This admin interface allows users to register and log in, view and manage finances, bookings, and announcements in an intuitive and mobile-friendly layout.

## Features

* User authentication (login, registration, logout)
* Dashboard with navigation to:

  * Finances
  * Bookings
  * Announcements
* Protected routes
* Persistent user session using `localStorage`
* Form validation on the frontend
* Responsive design with a bottom navigation bar for logged-in users

## Technologies Used

* React
* React Router
* Tailwind CSS
* Lucide React Icons

## File Structure

```
src/
├── components/
│   └── ui/
│       ├── Login.js
│       └── Register.js
├── pages/
│   ├── Dashboard.jsx
│   ├── Finances.jsx
│   ├── Bookings.jsx
│   └── Announcements.jsx
├── AuthContext.js
├── App.js
└── index.js
```

## Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/roomify-admin.git
cd roomify-admin
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The app will be available at `http://localhost:3000`.

## Usage

* New users can register on `/register`.
* Existing users can log in via `/login`.
* After authentication, users can navigate between pages using the bottom menu.
* Clicking "Вихід" will log the user out and return them to the login screen.

## Backend Communication

* API endpoints expected:

  * `POST /api/auth/login`
  * `POST /api/auth/register`

These should return and accept JSON. User data is saved to `localStorage` on login and cleared on logout.

## Notes

* All user inputs are validated on the frontend before being sent to the backend.
* Default placeholder data is used for finances if the backend is unreachable.

---

This project is designed to be extendable and simple for integration into a larger room management system.
