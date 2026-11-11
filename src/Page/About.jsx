import { Link } from "react-router-dom";
import Layout from "../compents/Layout.jsx";

const css = `
.split { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 22px; margin-top: 36px; align-items: start; }
.split > .panel, .split .stack > .panel { min-width: 0; padding: 24px; overflow-wrap: break-word; }
.split .stack { display: grid; align-content: start; gap: 22px; }
.panel .lead-in { font-size: 13px; letter-spacing: 1px; text-transform: uppercase; color: #60d0f8; margin-bottom: 8px; display: block; }
.panel p + p { margin-top: 14px; }
.team-card .role { color: #60d0f8 !important; font-size: 14px !important; }
.about-values { grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: stretch; }
.about-values > .card { height: 100%; }
@media (max-width: 900px) {
  .split { grid-template-columns: 1fr; }
}
@media (max-width: 560px) { .about-values { grid-template-columns: minmax(0, 1fr); } }
`;

const stats = [
    { value: "500+", label: "Students taught" },
    { value: "40+", label: "Expert tutors" },
    { value: "15+", label: "Subjects covered" },
    { value: "10", label: "Years of experience" },
];

const values = [
    { icon: "🤝", title: "Personal attention", text: "Every student learns differently, so every plan is built around the student." },
    { icon: "🎓", title: "Qualified tutors", text: "Our tutors are selected for their knowledge, patience and teaching experience." },
    { icon: "🕒", title: "Flexible learning", text: "Choose in-person or online sessions at times that fit your week." },
    { icon: "📈", title: "Real results", text: "We track progress session by session, so improvement is clear and steady." },
];

const team = [
    { name: "Ahmed Akoum", role: "Founder & Director" },
    { name: "Aya Aoun", role: "Administrator Assistant" },
    { name: "Sara Atik", role: "Administrator Assistant" },
    { name: "Ivan  Maatouk", role: "Tutor" },
];

const initials = (name) => name.split(" ").map((p) => p[0]).join("");

export default function About() {
    return (
        <Layout>
            <style>{css}</style>

            <section className="page-head">
                <span className="pill">About Us</span>
                <h1>Helping students <span className="accent">learn with confidence</span></h1>
                <p>AKOUM is a tutoring center that connects students with experienced tutors.</p>
            </section>

            {/* Story + mission/vision */}
            <div className="wrap split">
                <section className="panel glass">
                    <span className="lead-in">Our story</span>
                    <h2>Learning works best when it's personal</h2>
                    <p>
                        AKOUM started with a simple idea: students do better when they get focused help from
                        someone who understands how they learn. What began as a few private lessons grew into
                        a center with tutors across many subjects.
                    </p>
                    <p>
                        Today we help school and university students catch up, stay ahead and prepare for
                        exams, in our center. Our goal is the same as on day one: make every
                        student feel capable.
                    </p>
                </section>

                <div className="stack">
                    <section className="panel glass">
                        <span className="lead-in">Mission</span>
                        <p>To give every student access to clear, patient and effective teaching that builds real understanding.</p>
                    </section>
                    <section className="panel glass">
                        <span className="lead-in">Vision</span>
                        <p>A community where learning is confident, flexible and available to everyone who wants it.</p>
                    </section>
                </div>
            </div>

            {/* Key numbers */}
            <section className="section">
                <h2>AKOUM in numbers</h2>
                <p className="sub">A growing community of learners and teachers.</p>
                <div className="grid grid-4">
                    {stats.map((s) => (
                        <div key={s.label} className="stat glass" style={{ alignItems: "center" }}>
                            <strong>{s.value}</strong>
                            <span>{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Values */}
            <section className="section">
                <h2>What we believe in</h2>
                <p className="sub">The values behind every session.</p>
                <div className="grid grid-4 about-values">
                    {values.map((v) => (
                        <article key={v.title} className="card glass">
                            <div className="icon">{v.icon}</div>
                            <h3>{v.title}</h3>
                            <p>{v.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* Team */}
            <section className="section">
                <h2>Meet the team</h2>
                <p className="sub">The people who keep AKOUM running. </p>
                <div className="grid grid-4">
                    {team.map((m) => (
                        <article key={m.name} className="card glass team-card">
                            <div className="avatar">{initials(m.name)}</div>
                            <h3>{m.name}</h3>
                            <p className="role">{m.role}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="cta glass">
                    <h2>Ready to learn with us?</h2>
                    <p>Browse our tutors and take your first day at the center as a trial for free.</p>
                    <Link to="/tutors" className="btn btn-primary">Find a Tutor</Link>
                </div>
            </section>
        </Layout>
    );
}