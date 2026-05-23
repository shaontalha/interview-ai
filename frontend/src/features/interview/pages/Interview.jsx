import React, { useState } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview";

const NAV_ITEMS = [
  { key: "technical",  label: "Technical Questions", icon: "<>" },
  { key: "behavioral", label: "Behavioral Questions", icon: "💬" },
  { key: "roadmap",    label: "Road Map",             icon: "↗" },
];

const Interview = () => {
  const { report } = useInterview();

  const [localSection, setLocalSection] = useState("technical");
  const activeSection = localSection;
  const handleSection = setLocalSection;

  const {
    matchScore          = 0,
    technicalQuestions  = [],
    behavioralQuestions = [],
    skillsGaps          = [],
    preparationPlans    = [],
  } = report ?? {};

  const scoreCircumference = 2 * Math.PI * 26;

  if (!report) {
    return (
      <div className="interview interview--empty">
        <p>No report generated yet. Go back and generate one first.</p>
      </div>
    );
  }

  return (
    <div className="interview">

      {/* ── Left sidebar ── */}
      <aside className="interview__sidebar">
        <p className="interview__sidebar-heading">Sections</p>
        <nav className="interview__nav">
          {NAV_ITEMS.map(({ key, label, icon }) => (
            <button
              key={key}
              className={`interview__nav-item${activeSection === key ? " interview__nav-item--active" : ""}`}
              onClick={() => handleSection(key)}
            >
              <span className="interview__nav-icon">{icon}</span>
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* ── Center main ── */}
      <main className="interview__main">

        {activeSection === "technical" && (
          <section className="interview__section" key="technical">
            <div className="interview__section-header">
              <h2 className="interview__section-title">Technical Questions</h2>
              <span className="interview__section-count">{technicalQuestions.length} questions</span>
            </div>
            <div className="interview__cards">
              {technicalQuestions.map((q, i) => (
                <QuestionCard key={i} index={i + 1} {...q} />
              ))}
            </div>
          </section>
        )}

        {activeSection === "behavioral" && (
          <section className="interview__section" key="behavioral">
            <div className="interview__section-header">
              <h2 className="interview__section-title">Behavioral Questions</h2>
              <span className="interview__section-count">{behavioralQuestions.length} questions</span>
            </div>
            <div className="interview__cards">
              {behavioralQuestions.map((q, i) => (
                <QuestionCard key={i} index={i + 1} {...q} />
              ))}
            </div>
          </section>
        )}

        {activeSection === "roadmap" && (
          <section className="interview__section" key="roadmap">
            <div className="interview__section-header">
              <h2 className="interview__section-title">Preparation Road Map</h2>
              <span className="interview__section-badge">{preparationPlans.length}-day plan</span>
            </div>
            <div className="interview__roadmap">
              {preparationPlans.map((plan, i) => (
                <RoadmapCard
                  key={i}
                  plan={plan}
                  index={i}
                  total={preparationPlans.length}
                />
              ))}
            </div>
          </section>
        )}

      </main>

      {/* ── Right sidebar ── */}
      <aside className="interview__gaps">

        <div className="interview__score">
          <p className="interview__score-label">Match Score</p>
          <div className="interview__score-ring">
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="26" />
              <circle
                cx="32" cy="32" r="26"
                strokeDasharray={`${(matchScore / 100) * scoreCircumference} ${scoreCircumference}`}
              />
            </svg>
            <div className="interview__score-inner">
              <span className="interview__score-value">{matchScore}</span>
              <span className="interview__score-unit">%</span>
            </div>
          </div>
          <p className="interview__score-caption">Strong match for this role</p>
        </div>

        <div className="interview__gaps-block">
          <p className="interview__gaps-title">Skill Gaps</p>
          <div className="interview__gap-list">
            {skillsGaps.map((gap, i) => (
              <span
                key={i}
                className={`interview__gap-tag interview__gap-tag--${gap.severity}`}
              >
                {gap.skill}
              </span>
            ))}
          </div>
        </div>

      </aside>

    </div>
  );
};

/* ── QuestionCard ── */
const QuestionCard = ({ index, question, intention, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`q-card${open ? " q-card--open" : ""}`}>
      <button className="q-card__header" onClick={() => setOpen(o => !o)}>
        <span className="q-card__index">Q{index}</span>
        <span className="q-card__question">{question}</span>
        <span className="q-card__chevron">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="q-card__body">
          {intention && (
            <div className="q-card__intention">
              <span className="q-card__block-label">💡 Interviewer's intent</span>
              <p>{intention}</p>
            </div>
          )}
          <div className="q-card__answer">
            <span className="q-card__block-label">✦ Suggested answer</span>
            <p>{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── RoadmapCard ── */
const RoadmapCard = ({ plan, index, total }) => (
  <div className="roadmap-card">
    <div className="roadmap-card__timeline">
      <div className="roadmap-card__node" />
      {index < total - 1 && <div className="roadmap-card__line" />}
    </div>
    <div className="roadmap-card__content">
      <div className="roadmap-card__header">
        <span className="roadmap-card__day">{plan.day}</span>
        <span className="roadmap-card__focus">{plan.focus}</span>
      </div>
      <ul className="roadmap-card__tasks">
        {plan.tasks.map((task, i) => (
          <li key={i} className="roadmap-card__task">
            <span className="roadmap-card__bullet" />
            {task}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Interview;