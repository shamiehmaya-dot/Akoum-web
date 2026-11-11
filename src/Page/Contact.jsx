import { useState } from "react";
import Layout from "../compents/Layout.jsx";

const css = `
.contact-layout { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 28px; margin-top: 36px; align-items: start; }
.contact-layout > * { min-width: 0; }
.contact-layout > .panel, .info-stack > .panel { padding: 32px; }
.contact-layout .form-field { min-width: 0; }
.contact-layout .input, .contact-layout .textarea { display: block; width: 100%; min-width: 0; }
.info-stack { display: grid; gap: 22px; }

.info-row { display: flex; gap: 14px; align-items: flex-start; }
.info-row + .info-row { margin-top: 16px; }
.info-row .icon { width: 44px; height: 44px; font-size: 20px; border-radius: 14px; flex-shrink: 0; }
.info-row strong { display: block; margin-bottom: 2px; }
.info-row span { color: rgba(255,255,255,.72); font-size: 15px; overflow-wrap: anywhere; }

.hours { width: 100%; border-collapse: collapse; }
.hours td { padding: 9px 0; border-top: 1px solid rgba(255,255,255,.1); color: rgba(255,255,255,.78); font-size: 15px; }
.hours tr:first-child td { border-top: 0; }
.hours td:last-child { text-align: right; color: #60d0f8; }

.form-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
.form-field label { font-size: 14px; font-weight: 600; color: rgba(255,255,255,.85); }
.input, .textarea {
  padding: 13px 16px; border-radius: 14px; font: inherit; font-size: 15px; color: #fff; color-scheme: dark;
  background: rgba(14,14,14,.45); border: 1px solid rgba(255,255,255,.18); outline: none;
  transition: border-color .2s, box-shadow .2s;
}
.textarea { min-height: 130px; resize: vertical; }
.input:focus, .textarea:focus { border-color: #60d0f8; box-shadow: 0 0 0 3px rgba(96,208,248,.2); }
.input option { background: #2e2e30; }
.input[aria-invalid="true"], .textarea[aria-invalid="true"] { border-color: #ff5c8a; }
.err { color: #ffb3c6; font-size: 13px; }
.counter { text-align: right; font-size: 12px; color: rgba(255,255,255,.45); }
.form-actions .btn { width: 100%; text-align: center; }
.success { margin-bottom: 18px; padding: 14px 16px; border-radius: 14px; background: rgba(96,208,248,.12); border: 1px solid rgba(96,208,248,.5); color: #bfeeff; }

@media (max-width: 900px) {
  .contact-layout { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 520px) {
  .contact-layout > .panel, .info-stack > .panel { padding: 22px; }
}
`;

const empty = { name: "", email: "", subject: "General question", message: "" };

const validate = (v) => {
    const e = {};
    if (v.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
    if (v.message.trim().length < 10) e.message = "Your message should be at least 10 characters.";
    return e;
};

const hours = [
    ["Monday till Thursday", "4:00 - 8:00 pm"],
    ["Saturday", "12:00 - 4:00 pm"],
    ["Friday - Sunday", "Closed"],
];

export default function Contact() {
    const [values, setValues] = useState(empty);
    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(false);

    const onChange = (e) => {
        const { name, value } = e.target;
        setValues((v) => ({ ...v, [name]: value }));
        if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
        setSent(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const errs = validate(values);
        setErrors(errs);
        if (Object.keys(errs).length) return;

        try {
            const list = JSON.parse(localStorage.getItem("akoum-messages")) || [];
            list.push({ ...values, date: new Date().toISOString() });
            localStorage.setItem("akoum-messages", JSON.stringify(list));
        } catch {
            /* storage unavailable, ignore */
        }
        setSent(true);
        setValues(empty);
    };

    return (
        <Layout>
            <style>{css}</style>

            <section className="page-head">
                <span className="pill">Contact</span>
                <h1>We'd love to <span className="accent">hear from you</span></h1>
                <p>Questions about sessions, tutors or prices? Send us a message or visit the center.</p>
            </section>

            <div className="wrap contact-layout">
                {/* ---------- Form ---------- */}
                <section className="panel glass">
                    <h2>Send us a message</h2>

                    {sent && (
                        <div className="success" role="status">
                            Thank you! Your message was sent. We'll get back to you soon.
                        </div>
                    )}

                    <form onSubmit={onSubmit} noValidate>
                        <div className="form-field">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name" name="name" className="input" type="text" placeholder="Your full name"
                                value={values.name} onChange={onChange}
                                aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined}
                            />
                            {errors.name && <span id="name-err" className="err">{errors.name}</span>}
                        </div>

                        <div className="form-field">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email" name="email" className="input" type="email" placeholder="you@example.com"
                                value={values.email} onChange={onChange}
                                aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined}
                            />
                            {errors.email && <span id="email-err" className="err">{errors.email}</span>}
                        </div>

                        <div className="form-field">
                            <label htmlFor="subject">Subject</label>
                            <select id="subject" name="subject" className="input" value={values.subject} onChange={onChange}>
                                <option>General question</option>
                                <option>Book a session</option>
                                <option>Become a tutor</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="form-field">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message" name="message" className="textarea" placeholder="How can we help?"
                                maxLength={500} value={values.message} onChange={onChange}
                                aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined}
                            />
                            <div className="counter">{values.message.length}/500</div>
                            {errors.message && <span id="message-err" className="err">{errors.message}</span>}
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">Send message</button>
                        </div>
                    </form>
                </section>

                {/* ---------- Info ---------- */}
                <div className="info-stack">
                    <section className="panel glass">
                        <h2>Contact details</h2>
                        <div className="info-row">
                            <div className="icon">📍</div>
                            <div><strong>Address</strong><span> Hlalieh, Saida, Lebanon</span></div>
                        </div>
                        <div className="info-row">
                            <div className="icon">📞</div>
                            <div><strong>Phone</strong><span>+961 70 314 321 or +961 70 196 544</span></div>
                        </div>
                        <div className="info-row">
                            <div className="icon">✉️</div>
                            <div><strong>Email</strong><span>info@akoum.example</span></div>
                        </div>
                    </section>

                    <section className="panel glass">
                        <h2>Opening hours</h2>
                        <table className="hours">
                            <tbody>
                                {hours.map(([day, time]) => (
                                    <tr key={day}><td>{day}</td><td>{time}</td></tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>
            </div>

        </Layout>
    );
}