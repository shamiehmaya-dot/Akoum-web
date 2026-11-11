import { Link } from "react-router-dom";
import Layout from "../compents/Layout.jsx";
import { tutors } from "./tutors.js";
import "./Home.css";

const stats = [
    { value: "500+", label: "Students taught" },
    { value: `${tutors.length}+`, label: "Expert tutors" },
    { value: "15+", label: "Subjects covered" },
    { value: "10+", label: "Years of experience" },
];

const services = [
    {
        icon: "👤",
        title: "One-on-One Tutoring",
        text: "Personal sessions built around your pace, learning style and goals.",
    },
    {
        icon: "🎯",
        title: "Exam Preparation",
        text: "Focused revision, past papers and proven exam strategies.",
    },
];

const steps = [
    {
        number: "01",
        title: "Find a tutor",
        text: "Browse our tutors and find the right match for your subject.",
    },
    {
        number: "02",
        title: "Book a session",
        text: "Choose a date and time that fits your schedule.",
    },
    {
        number: "03",
        title: "Start learning",
        text: "Meet your tutor and make progress with a plan built for you.",
    },
];

const feedback = [
    {
        name: "Maya R.",
        text: "My grades went up in just two months. The tutors are patient and really know their subjects.",
        rating: 5,
    },
    {
        name: "Ahmad T.",
        text: "Booking was easy and the sessions worked perfectly. I felt prepared for my exams.",
        rating: 5,
    },
    {
        name: "Nour S.",
        text: "Friendly teachers and clear explanations. I finally enjoy math.",
        rating: 4,
    },
];

const initials = (name) =>
    name
        .split(" ")
        .map((part) => part[0])
        .join("");

const stars = (rating) =>
    "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));

export default function Home() {
    const featuredTutors = [...tutors]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);

    return (
        <Layout>
            <section className="hero">
                <span className="pill">AKOUM Tutoring Center</span>
                <h1>
                    Learn with the right tutor, <span className="accent">at AKOUM</span>
                </h1>
                <p className="lead">
                    Expert tutors, flexible sessions and real results—learning that works
                    for you.
                </p>
                <div className="hero-actions">
                    <Link to="/tutors" className="btn btn-primary">
                        Find a Tutor
                    </Link>
                    <Link to="/about" className="btn btn-ghost">
                        Learn More
                    </Link>
                </div>
                <div className="stats">
                    {stats.map((stat) => (
                        <div key={stat.label} className="stat glass">
                            <strong>{stat.value}</strong>
                            <span>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section">
                <div className="section-heading">
                    <span className="pill">What we offer</span>
                    <h2>Support for every learning goal</h2>
                    <p className="sub">
                        Choose the support that fits your needs and feel confident at every
                        step.
                    </p>
                </div>
                <div className="grid grid-2">
                    {services.map((service) => (
                        <article key={service.title} className="card glass home-service">
                            <div className="icon" aria-hidden="true">
                                {service.icon}
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="section">
                <div className="section-heading">
                    <span className="pill">Simple to get started</span>
                    <h2>Your next step is easy</h2>
                    <p className="sub">Find support and get started in three simple steps.</p>
                </div>
                <div className="grid grid-3">
                    {steps.map((step) => (
                        <article key={step.number} className="card glass home-step">
                            <span className="step-number">{step.number}</span>
                            <h3>{step.title}</h3>
                            <p>{step.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="section">
                <div className="section-heading">
                    <span className="pill">Meet our tutors</span>
                    <h2>Learn from people who care</h2>
                    <p className="sub">
                        Experienced tutors ready to help you reach your goals.
                    </p>
                </div>
                <div className="grid grid-4">
                    {featuredTutors.map((tutor) => (
                        <article key={tutor.id} className="card glass home-tutor">
                            <div className="avatar">{initials(tutor.name)}</div>
                            <h3>{tutor.name}</h3>
                            <div className="tags">
                                {tutor.subjects.slice(0, 2).map((subject) => (
                                    <span key={subject} className="tag">
                                        {subject}
                                    </span>
                                ))}
                            </div>
                            <p className="rating">
                                <span className="stars">{stars(tutor.rating)}</span>{" "}
                                {tutor.rating} ({tutor.reviews})
                            </p>
                            <Link
                                to={`/tutors#tutor-${tutor.id}`}
                                className="btn btn-small btn-primary"
                            >
                                View Profile
                            </Link>
                        </article>
                    ))}
                </div>
                <div className="home-more">
                    <Link to="/tutors" className="btn btn-ghost">
                        Browse All Tutors
                    </Link>
                </div>
            </section>

            <section className="section">
                <div className="section-heading">
                    <span className="pill">Student stories</span>
                    <h2>Real progress, real confidence</h2>
                </div>
                <div className="grid grid-3">
                    {feedback.map((review) => (
                        <article key={review.name} className="card glass home-review">
                            <p className="stars" aria-label={`${review.rating} out of 5 stars`}>
                                {stars(review.rating)}
                            </p>
                            <p>“{review.text}”</p>
                            <strong>{review.name}</strong>
                        </article>
                    ))}
                </div>
            </section>

            <section className="section">
                <div className="cta glass">
                    <h2>Ready to reach your goals?</h2>
                    <p>Find a tutor who will help you move forward with confidence.</p>
                    <Link to="/tutors" className="btn btn-primary">
                        Find Your Tutor
                    </Link>
                </div>
            </section>
        </Layout>
    );
}
