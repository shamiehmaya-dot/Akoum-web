import { Link } from "react-router-dom";
import Layout from "../compents/Layout.jsx";
import { tutors } from "./tutors.js";

const css = `
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.svc { align-items: flex-start; text-align: left; }
.svc ul { list-style: none; margin: 6px 0 0; padding: 0; display: grid; gap: 8px; }
.svc li { font-size: 14px; color: rgba(255,255,255,.82); }
.svc li::before { content: "✓"; color: #60d0f8; margin-right: 8px; font-weight: 700; }
.svc .best { margin-top: auto; padding-top: 12px; font-size: 13px; color: #60d0f8 !important; }

.chip-list { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
.chip-static {
  padding: 8px 18px; border-radius: 999px; font-size: 14px; color: #60d0f8;
  background: rgba(96,208,248,.1); border: 1px solid rgba(96,208,248,.3);
}

.faq-list { max-width: 800px; margin: 0 auto; display: grid; gap: 12px; text-align: left; }
.faq { border-radius: 18px; padding: 0 22px; }
.faq summary { cursor: pointer; padding: 18px 0; font-weight: 600; list-style: none; display: flex; justify-content: space-between; gap: 12px; }
.faq summary::-webkit-details-marker { display: none; }
.faq summary::after { content: "+"; color: #60d0f8; font-size: 22px; line-height: 1; transition: transform .2s; }
.faq[open] summary::after { transform: rotate(45deg); }
.faq p { padding-bottom: 18px; color: rgba(255,255,255,.75); line-height: 1.65; }

@media (max-width: 760px) { .grid-2 { grid-template-columns: 1fr; } }
`;

const services = [
    {
        icon: "👤",
        title: "One-on-One Tutoring",
        text: "Private sessions built around your goals, pace and learning style.",
        features: ["Personal study plan", "Flexible scheduling", "Feedback after every session"],
        best: "Best for: catching up or going deeper",
    },
    {
        icon: "👥",
        title: "Group Classes",
        text: "Small groups that learn together and motivate each other.",
        features: ["Small class sizes", "Shared practice and discussion", "Lower cost per student"],
        best: "Best for: steady weekly learning",
    },
    {
        icon: "🎯",
        title: "Exam Preparation",
        text: "Focused revision to help you walk into exams prepared and calm.",
        features: ["Past papers and mock exams", "Revision schedules", "Time management tips"],
        best: "Best for: school and university exams",
    },
];

const steps = [
    { n: 1, title: "Find a tutor", text: "Browse tutors and filter by the subject you need." },
    { n: 2, title: "Book a session", text: "Pick a date and time for your visit to the center." },
    { n: 3, title: "Start learning", text: "Meet your tutor and track your progress." },
];

const faqs = [
    { q: "How do I book a session?", a: "Open a tutor's profile, choose a date, a time slot and the session type, then confirm your booking." },
    { q: "Where do sessions take place?", a: "Tutoring sessions take place in person at the AKOUM center." },
    { q: "Can I change or cancel a booking?", a: "Yes. You can manage your sessions from your dashboard after logging in." },
    { q: "Which subjects do you cover?", a: "We cover sciences, languages, math and computer science, with more added as new tutors join." },
];

const allSubjects = [...new Set(tutors.flatMap((t) => t.subjects))];

export default function Services() {
    return (
        <Layout>
            <style>{css}</style>

            <section className="page-head">
                <span className="pill">Our Services</span>
                <h1>Learning options <span className="accent">built around you</span></h1>
                <p>Choose the format that fits your goals, schedule and budget.</p>
            </section>

            <section className="section">
                <div className="grid grid-2">
                    {services.map((s) => (
                        <article key={s.title} className="card glass svc">
                            <div className="icon">{s.icon}</div>
                            <h3>{s.title}</h3>
                            <p>{s.text}</p>
                            <ul>
                                {s.features.map((f) => <li key={f}>{f}</li>)}
                            </ul>
                            <p className="best">{s.best}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="section">
                <h2>Subjects we teach</h2>
                <p className="sub">Find a tutor for any of these.</p>
                <div className="chip-list">
                    {allSubjects.map((s) => <span key={s} className="chip-static">{s}</span>)}
                </div>
            </section>

            <section className="section">
                <h2>How it works</h2>
                <p className="sub">From search to your first lesson in minutes.</p>
                <div className="grid grid-3">
                    {steps.map((s) => (
                        <article key={s.n} className="card glass">
                            <div className="num">{s.n}</div>
                            <h3>{s.title}</h3>
                            <p>{s.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="section">
                <h2>Frequently asked questions</h2>
                <p className="sub">Quick answers to common questions.</p>
                <div className="faq-list">
                    {faqs.map((f) => (
                        <details key={f.q} className="faq glass">
                            <summary>{f.q}</summary>
                            <p>{f.a}</p>
                        </details>
                    ))}
                </div>
            </section>

            <section className="section">
                <div className="cta glass">
                    <h2>Find the right tutor today</h2>
                    <p>Search by subject and book in a few clicks.</p>
                    <Link to="/tutors" className="btn btn-primary">Browse Tutors</Link>
                </div>
            </section>
        </Layout>
    );
}