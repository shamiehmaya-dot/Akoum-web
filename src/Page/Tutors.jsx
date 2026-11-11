import { useEffect, useMemo, useRef, useState } from "react";
import { tutors } from "./tutors.js";
import "./Home.css";

const extraCss = `
.page-head { max-width: 900px; margin: 0 auto; padding: 60px 0 10px; text-align: center; }
.page-head h1 { font-size: clamp(32px, 5vw, 50px); font-weight: 700; }
.page-head p { margin-top: 12px; color: rgba(255,255,255,.7); }
.wrap { max-width: 1200px; margin: 0 auto; }

/* ----- list view ----- */
.controls { max-width: 1200px; margin: 28px auto 0; padding: 18px; border-radius: 22px; display: flex; flex-direction: column; gap: 16px; }
.controls-row { display: flex; gap: 12px; flex-wrap: wrap; }
.search, .sort, .input {
  padding: 13px 16px; border-radius: 14px; font: inherit; font-size: 15px; color: #fff; color-scheme: dark;
  background: rgba(14,14,14,.45); border: 1px solid rgba(255,255,255,.18); outline: none;
  transition: border-color .2s, box-shadow .2s;
}
.search { flex: 1; min-width: 220px; }
.search::placeholder { color: rgba(255,255,255,.45); }
.search:focus, .sort:focus, .input:focus { border-color: #60d0f8; box-shadow: 0 0 0 3px rgba(96,208,248,.2); }
.sort option, .input option { background: #2e2e30; color: #fff; }

.fav-toggle {
  padding: 13px 18px; border-radius: 14px; font: inherit; font-size: 15px; cursor: pointer; color: #fff;
  background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.18); transition: all .2s;
}
.fav-toggle:hover { background: rgba(255,255,255,.14); }
.fav-toggle.on { background: rgba(255,92,138,.2); border-color: rgba(255,92,138,.6); }

.chips { display: flex; gap: 10px; flex-wrap: wrap; }
.chip {
  padding: 8px 18px; border-radius: 999px; font: inherit; font-size: 14px; font-weight: 500; cursor: pointer; color: rgba(255,255,255,.8);
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.16); transition: all .2s;
}
.chip:hover { background: rgba(255,255,255,.14); color: #fff; }
.chip.active { color: #fff; border-color: rgba(96,208,248,.6); background: linear-gradient(135deg, #347ef5, #133599); box-shadow: 0 0 18px rgba(52,126,245,.45); }

.count { max-width: 1200px; margin: 22px auto 14px; color: rgba(255,255,255,.65); font-size: 14px; }
.results { max-width: 1200px; margin: 0 auto; padding-bottom: 40px; }
.tutor-card { position: relative; }
.card-btn { cursor: pointer; font: inherit; }

.heart {
  position: absolute; top: 14px; right: 14px; width: 40px; height: 40px; display: grid; place-items: center;
  font-size: 20px; cursor: pointer; color: rgba(255,255,255,.7); border-radius: 50%;
  background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18); transition: all .2s;
}
.heart:hover { transform: scale(1.12); color: #fff; }
.heart.on { color: #ff5c8a; border-color: rgba(255,92,138,.6); background: rgba(255,92,138,.18); box-shadow: 0 0 16px rgba(255,92,138,.45); }

.exp { font-size: 13px !important; color: rgba(255,255,255,.55) !important; }
.tags { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
.tag { padding: 4px 12px; border-radius: 999px; font-size: 12px; color: #60d0f8; background: rgba(96,208,248,.1); border: 1px solid rgba(96,208,248,.3); }

.empty { padding: 60px 24px; border-radius: 24px; text-align: center; }
.empty h3 { font-size: 22px; margin-bottom: 8px; }
.empty p { color: rgba(255,255,255,.65); margin-bottom: 20px; }

/* ----- profile view ----- */
.back { display: inline-block; margin-top: 36px; background: none; border: 0; padding: 0; font: inherit; color: #60d0f8; font-weight: 600; cursor: pointer; }
.back:hover { text-decoration: underline; }

.profile-head { margin-top: 18px; padding: 32px; border-radius: 26px; display: flex; gap: 28px; align-items: center; position: relative; }
.profile-head .heart { top: 20px; right: 20px; width: 44px; height: 44px; }
.big-avatar {
  width: 120px; height: 120px; flex-shrink: 0; display: grid; place-items: center; border-radius: 50%;
  font-size: 42px; font-weight: 700; background: linear-gradient(135deg, #347ef5, #133599);
  border: 3px solid rgba(96,208,248,.6); box-shadow: 0 0 30px rgba(52,126,245,.55);
}
.profile-info h1 { font-size: clamp(28px, 4vw, 40px); }
.profile-info .tags { justify-content: flex-start; margin: 12px 0; }
.meta { display: flex; gap: 18px; flex-wrap: wrap; color: rgba(255,255,255,.72); font-size: 15px; }

.layout { margin-top: 22px; display: grid; grid-template-columns: 1.6fr 1fr; gap: 22px; align-items: start; padding-bottom: 20px; }
.panel { padding: 28px; border-radius: 24px; }
.panel + .panel { margin-top: 22px; }
.panel h2 { font-size: 22px; margin-bottom: 14px; }
.panel p { color: rgba(255,255,255,.75); line-height: 1.65; }

.facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 18px; }
.fact { padding: 14px; border-radius: 16px; text-align: center; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12); }
.fact strong { display: block; font-size: 20px; color: #60d0f8; }
.fact span { font-size: 13px; color: rgba(255,255,255,.6); }

.review { padding: 16px 0; border-top: 1px solid rgba(255,255,255,.1); }
.review:first-of-type { border-top: 0; padding-top: 0; }
.review .top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.review .name { font-weight: 600; }

.booking { position: sticky; top: 100px; }
.field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
.field label { font-size: 14px; font-weight: 600; color: rgba(255,255,255,.85); }
.input { padding: 12px 14px; border-radius: 12px; }
.slots { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.slot {
  padding: 10px; border-radius: 12px; font: inherit; font-size: 14px; cursor: pointer; color: #fff;
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.18); transition: all .2s;
}
.slot:hover { background: rgba(255,255,255,.14); }
.slot.active { background: linear-gradient(135deg, #347ef5, #133599); border-color: rgba(96,208,248,.6); box-shadow: 0 0 16px rgba(52,126,245,.45); }
.booking .btn { width: 100%; text-align: center; }
.msg { margin-top: 14px; padding: 12px 14px; border-radius: 12px; font-size: 14px; }
.msg.error { background: rgba(255,92,138,.15); border: 1px solid rgba(255,92,138,.5); color: #ffb3c6; }
.msg.ok { background: rgba(96,208,248,.12); border: 1px solid rgba(96,208,248,.5); color: #bfeeff; }

.notfound { margin: 40px auto; max-width: 560px; padding: 50px 24px; border-radius: 24px; text-align: center; }
.notfound h1 { font-size: 28px; margin-bottom: 10px; }
.notfound p { color: rgba(255,255,255,.7); margin-bottom: 22px; }

.nav-links a.active { color: #60d0f8 !important; }

@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; }
  .booking { position: static; }
}
@media (max-width: 600px) {
  .profile-head { flex-direction: column; text-align: center; padding: 26px 20px; }
  .profile-info .tags { justify-content: center; }
  .meta { justify-content: center; }
  .facts { grid-template-columns: 1fr; }
}
`;

const subjects = ["All", ...new Set(tutors.flatMap((t) => t.subjects))];

const initials = (name) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("");
const stars = (n) => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));

function readList(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

// "/tutors#tutor-3" -> 3, anything else -> null
const getHashId = () => {
  const m = window.location.hash.match(/^#tutor-(\d+)$/);
  return m ? Number(m[1]) : null;
};


function Profile({ tutor, isFav, onToggleFav, onBack }) {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [type, setType] = useState("In person");
  const [message, setMessage] = useState(null); // { kind: "error" | "ok", text }

  const today = new Date().toISOString().slice(0, 10);

  if (!tutor) {
    return (
      <div className="notfound glass">
        <h1>Tutor not found</h1>
        <p>We couldn't find a tutor with that link.</p>
        <button type="button" className="btn btn-primary" onClick={onBack}>
          Back to tutors
        </button>
      </div>
    );
  }

  const confirmBooking = (e) => {
    e.preventDefault();
    if (!date)
      return setMessage({ kind: "error", text: "Please choose a date." });
    if (date < today)
      return setMessage({
        kind: "error",
        text: "The date can't be in the past.",
      });
    if (!time)
      return setMessage({ kind: "error", text: "Please choose a time slot." });

    const bookings = readList("akoum-bookings");
    const clash = bookings.some(
      (b) => b.tutorId === tutor.id && b.date === date && b.time === time,
    );
    if (clash)
      return setMessage({
        kind: "error",
        text: "You already booked this slot.",
      });

    bookings.push({
      id: Date.now(),
      tutorId: tutor.id,
      tutorName: tutor.name,
      date,
      time,
      type,
    });
    try {
      localStorage.setItem("akoum-bookings", JSON.stringify(bookings));
    } catch {
      /* ignore */
    }
    setMessage({
      kind: "ok",
      text: `Booked! ${tutor.name} on ${date} at ${time} (${type}).`,
    });
    setTime("");
  };

  return (
    <div className="wrap">
      <button type="button" className="back" onClick={onBack}>
        ← Back to tutors
      </button>

      <section className="profile-head glass">
        <div className="big-avatar">{initials(tutor.name)}</div>
        <div className="profile-info">
          <h1>{tutor.name}</h1>
          <div className="tags">
            {tutor.subjects.map((s) => (
              <span key={s} className="tag">
                {s}
              </span>
            ))}
          </div>
          <div className="meta">
            <span>
              <span className="stars">{stars(tutor.rating)}</span>{" "}
              {tutor.rating} ({tutor.reviews} reviews)
            </span>
            <span>{tutor.experience} experience</span>
          </div>
        </div>
        <button
          type="button"
          className={`heart ${isFav ? "on" : ""}`}
          onClick={onToggleFav}
          aria-pressed={isFav}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          {isFav ? "♥" : "♡"}
        </button>
      </section>

      <div className="layout">
        <div>
          <section className="panel glass">
            <h2>About {tutor.name.split(" ")[0]}</h2>
            <p>{tutor.bio}</p>
            <div className="facts">
              <div className="fact">
                <strong>{tutor.experience}</strong>
                <span>Experience</span>
              </div>
              <div className="fact">
                <strong>{tutor.rating}</strong>
                <span>Average rating</span>
              </div>
              <div className="fact">
                <strong>{tutor.slots.length}</strong>
                <span>Slots per day</span>
              </div>
            </div>
          </section>

          <section className="panel glass">
            <h2>Student reviews</h2>
            {tutor.reviewList.map((r) => (
              <article key={r.name} className="review">
                <div className="top">
                  <span className="name">{r.name}</span>
                  <span className="stars">{stars(r.rating)}</span>
                </div>
                <p>{r.text}</p>
              </article>
            ))}
          </section>
        </div>

        <aside className="panel glass booking">
          <h2>Book a session</h2>
          <form onSubmit={confirmBooking} noValidate>
            <div className="field">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                className="input"
                type="date"
                min={today}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setMessage(null);
                }}
              />
            </div>

            <div className="field">
              <label>Time</label>
              <div className="slots">
                {tutor.slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`slot ${time === s ? "active" : ""}`}
                    onClick={() => {
                      setTime(s);
                      setMessage(null);
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label htmlFor="type">Session type</label>
              <select
                id="type"
                className="input"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option>In person</option>
                <option>Online</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Confirm booking
            </button>
            {message && (
              <div className={`msg ${message.kind}`} role="status">
                {message.text}
              </div>
            )}
          </form>
        </aside>
      </div>
    </div>
  );
}


export default function Tutors() {
  const rootRef = useRef(null);
  const [selectedId, setSelectedId] = useState(getHashId);

  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("All");
  const [sort, setSort] = useState("rating");
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [favorites, setFavorites] = useState(() => readList("akoum-favorites"));

  // keep the page in sync with the URL hash (back button, shared links)
  useEffect(() => {
    const onHash = () => setSelectedId(getHashId());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // jump to the top whenever we switch between list and profile
  useEffect(() => {
    rootRef.current?.scrollTo({ top: 0 });
  }, [selectedId]);

  useEffect(() => {
    try {
      localStorage.setItem("akoum-favorites", JSON.stringify(favorites));
    } catch {
      /* ignore */
    }
  }, [favorites]);

  const openTutor = (id) => {
    window.location.hash = `tutor-${id}`;
  };
  const closeTutor = () => {
    window.history.pushState(null, "", window.location.pathname);
    setSelectedId(null);
  };

  const toggleFavorite = (id) =>
    setFavorites((f) =>
      f.includes(id) ? f.filter((x) => x !== id) : [...f, id],
    );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tutors
      .filter((t) => subject === "All" || t.subjects.includes(subject))
      .filter(
        (t) =>
          !q ||
          t.name.toLowerCase().includes(q) ||
          t.subjects.some((s) => s.toLowerCase().includes(q)),
      )
      .filter((t) => !onlyFavs || favorites.includes(t.id))
      .sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name);
        if (sort === "experience")
          return parseInt(b.experience) - parseInt(a.experience);
        return b.rating - a.rating;
      });
  }, [query, subject, sort, onlyFavs, favorites]);

  const reset = () => {
    setQuery("");
    setSubject("All");
    setOnlyFavs(false);
  };

  const selected = tutors.find((t) => t.id === selectedId);

  return (
    <div className="home" ref={rootRef}>
      <style>{extraCss}</style>

      {selectedId !== null ? (
       
        <Profile
          key={selectedId}
          tutor={selected}
          isFav={selected ? favorites.includes(selected.id) : false}
          onToggleFav={() => selected && toggleFavorite(selected.id)}
          onBack={closeTutor}
        />
      ) : (
       
        <>
          <section className="page-head">
            <span className="pill">Our Tutors</span>
            <h1>
              Find your <span className="accent">perfect tutor</span>
            </h1>
            <p>
              Search by name or subject, then open a profile to book a session.
            </p>
          </section>

          <section className="controls glass">
            <div className="controls-row">
              <input
                className="search"
                type="search"
                placeholder="Search by name or subject..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search tutors"
              />
              <select
                className="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort tutors"
              >
                <option value="rating">Top rated</option>
                <option value="experience">Most experienced</option>
                <option value="name">Name (A-Z)</option>
              </select>
              <button
                type="button"
                className={`fav-toggle ${onlyFavs ? "on" : ""}`}
                onClick={() => setOnlyFavs(!onlyFavs)}
                aria-pressed={onlyFavs}
              >
                {onlyFavs ? "♥" : "♡"} Favorites ({favorites.length})
              </button>
            </div>

            <div className="chips" role="group" aria-label="Filter by subject">
              {subjects.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`chip ${subject === s ? "active" : ""}`}
                  onClick={() => setSubject(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </section>

          <p className="count">
            Showing {results.length} of {tutors.length} tutors
          </p>

          <section className="results">
            {results.length > 0 ? (
              <div className="grid grid-4">
                {results.map((t) => {
                  const isFav = favorites.includes(t.id);
                  return (
                    <article key={t.id} className="card glass tutor tutor-card">
                      <button
                        type="button"
                        className={`heart ${isFav ? "on" : ""}`}
                        onClick={() => toggleFavorite(t.id)}
                        aria-label={
                          isFav
                            ? `Remove ${t.name} from favorites`
                            : `Add ${t.name} to favorites`
                        }
                        aria-pressed={isFav}
                      >
                        {isFav ? "♥" : "♡"}
                      </button>

                      <div className="avatar">{initials(t.name)}</div>
                      <h3>{t.name}</h3>
                      <div className="tags">
                        {t.subjects.map((s) => (
                          <span key={s} className="tag">
                            {s}
                          </span>
                        ))}
                      </div>
                      <p className="rating">
                        <span className="stars">{stars(t.rating)}</span>{" "}
                        {t.rating} ({t.reviews})
                      </p>
                      <p className="exp">{t.experience} experience</p>
                      <button
                        type="button"
                        className="btn btn-small btn-primary card-btn"
                        onClick={() => openTutor(t.id)}
                      >
                        View Profile
                      </button>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="empty glass">
                <h3>No tutors found</h3>
                <p>Try a different search or subject.</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={reset}
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>
        </>
      )}

    </div>
  );
}
