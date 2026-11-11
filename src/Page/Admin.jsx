import { useState } from "react";
import "./Admin.css";

const sections = ["Overview", "Tutors", "Students", "Bookings", "Messages", "Attendance"];
const statuses = new Set(["Active", "On leave", "New", "Confirmed", "Pending", "Present", "Absent"]);

const tutors = [
  { name: "Ivan Maatouk", subject: "Mathematics", sessions: 18, status: "Active" },
  { name: "Samuel Montoyes", subject: "Physics", sessions: 14, status: "Active" },
  { name: "Nevean remlawe", subject: "English", sessions: 12, status: "On leave" },
];

const students = [
  { name: "Noah Williams", grade: "Grade 10", tutor: "Ivan Maatouk", status: "Active" },
  { name: "Sofia Martin", grade: "Grade 12", tutor: "Samuel Montoyes", status: "Active" },
  { name: "Ethan Brown", grade: "Grade 9", tutor: "Amira Hassan", status: "New" },
];

const bookings = [
  { student: "Noah Williams", subject: "Mathematics", time: "Today, 3:00 PM", status: "Confirmed" },
  { student: "Sofia Martin", subject: "Physics", time: "Today, 4:30 PM", status: "Confirmed" },
  { student: "Ethan Brown", subject: "English", time: "Tomorrow, 10:00 AM", status: "Pending" },
];

const messages = [
  { name: "Olivia Carter", topic: "Tutoring options", date: "Today" },
  { name: "Liam Davis", topic: "Schedule change", date: "Yesterday" },
  { name: "Emma Wilson", topic: "New student enquiry", date: "Yesterday" },
];

const attendance = [
  { student: "Noah Williams", subject: "Mathematics", date: "Today", status: "Present" },
  { student: "Sofia Martin", subject: "Physics", date: "Today", status: "Present" },
  { student: "Ethan Brown", subject: "English", date: "Yesterday", status: "Absent" },
];

function DataTable({ headers, rows, className = "" }) {
  return (
    <div className="admin-table-wrap">
      <table className={`admin-table ${className}`}>
        <thead>
          <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row[0]}-${index}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${cell}-${cellIndex}`}>
                  {statuses.has(cell)
                    ? <span className={`admin-status ${cell.toLowerCase().replaceAll(" ", "-")}`}>{cell}</span>
                    : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionContent({ section }) {
  if (section === "Tutors") {
    return <DataTable headers={["Tutor", "Subject", "Sessions this month", "Status"]} rows={tutors.map((item) => [item.name, item.subject, item.sessions, item.status])} />;
  }
  if (section === "Students") {
    return <DataTable headers={["Student", "Grade", "Assigned tutor", "Status"]} rows={students.map((item) => [item.name, item.grade, item.tutor, item.status])} />;
  }
  if (section === "Bookings") {
    return <DataTable headers={["Student", "Subject", "Session time", "Status"]} rows={bookings.map((item) => [item.student, item.subject, item.time, item.status])} />;
  }
  if (section === "Messages") {
    return <DataTable headers={["From", "Topic", "Received"]} rows={messages.map((item) => [item.name, item.topic, item.date])} />;
  }
  if (section === "Attendance") {
    return <DataTable className="attendance-table" headers={["Student", "Subject", "Date", "Attendance"]} rows={attendance.map((item) => [item.student, item.subject, item.date, item.status])} />;
  }

  return (
    <div className="admin-overview">
      <div className="admin-stats">
        <article className="admin-stat"><span>Active students</span><strong>128</strong><small>+8 this month</small></article>
        <article className="admin-stat"><span>Available tutors</span><strong>16</strong><small>Across 9 subjects</small></article>
        <article className="admin-stat"><span>Sessions this week</span><strong>42</strong><small>6 today</small></article>
        <article className="admin-stat"><span>Unread messages</span><strong>3</strong><small>Follow up when ready</small></article>
      </div>
      <div className="admin-overview-grid">
        <section className="admin-card">
          <h3>Recent attendance</h3>
          <DataTable className="attendance-table" headers={["Student", "Subject", "Date", "Attendance"]} rows={attendance.map((item) => [item.student, item.subject, item.date, item.status])} />
        </section>
      </div>
    </div>
  );
}

export default function Admin({ onLogout }) {
  const [section, setSection] = useState("Overview");

  return (
    <section className="admin-page">
      <header className="admin-header">
        <div>
          <span className="pill">Admin workspace · Demo</span>
          <h1>Dashboard</h1>
          <p>Manage your tutoring center from one place.</p>
        </div>
        <button className="btn btn-ghost admin-logout" type="button" onClick={onLogout}>
          Sign out
        </button>
      </header>

      <nav className="admin-tabs" aria-label="Admin sections">
        {sections.map((item) => (
          <button
            key={item}
            className={`admin-tab ${section === item ? "active" : ""}`}
            type="button"
            aria-pressed={section === item}
            onClick={() => setSection(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <section className="admin-section">
        <div className="admin-section-heading">
          <h2>{section}</h2>
          <span>Sample data for preview</span>
        </div>
        <SectionContent section={section} />
      </section>
      <p className="admin-demo-note">
        Demo dashboard: changes are not saved and this page is not protected by real authentication.
      </p>
    </section>
  );
}
