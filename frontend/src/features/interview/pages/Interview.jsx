import React, { useState } from "react";
import "../style/interview.scss";

/**
 * UI LAYER — Interview
 * Pure presentational component. No state logic beyond active nav tab.
 * All data passed via props from useInterviewReport hook.
 * Default prop uses the actual API response shape for standalone rendering.
 */

const SAMPLE_DATA = {
  matchScore: 85,
  technicalQuestions: [
    {
      question: "How do you handle state management in a large-scale React application, and when would you choose Context API over libraries like Redux?",
      intention: "To evaluate the candidate's understanding of React hooks and their ability to architect scalable frontend solutions.",
      answer: "For simple or medium applications, I use React Hooks like useState and useReducer combined with the Context API for global data. If the app has complex state transitions or high-frequency updates, Redux or Zustand might be better to prevent unnecessary re-renders. I prioritize maintainability and performance by keeping state as local as possible.",
    },
    {
      question: "Explain how you implement JWT-based authentication in a Node.js/Express application.",
      intention: "To check if the candidate understands authentication and authorization, a specific requirement in the job description.",
      answer: "When a user logs in, the server validates credentials and generates a signed JWT containing user IDs or roles. This token is sent to the client, usually stored in an HttpOnly cookie or local storage. For subsequent requests, a middleware decodes the token from the header to authorize the user before allowing access to protected routes.",
    },
    {
      question: "In MongoDB, how do you handle relationships between data entities? Compare embedding vs. referencing.",
      intention: "To assess database design skills and knowledge of performance trade-offs.",
      answer: "Embedding (denormalization) involves nesting documents within each other, which is great for one-to-few relationships and fast read performance. Referencing (normalization) involves storing ObjectIDs and using .populate() or $lookup, which is better for many-to-many relationships or data that changes frequently.",
    },
    {
      question: "How do you optimize a MERN stack application for performance and scalability?",
      intention: "To see if the candidate can handle the 'optimize applications for speed' responsibility mentioned in the JD.",
      answer: "On the frontend, I use code-splitting, lazy loading, and memoization (useMemo/memo). On the backend, I implement indexing in MongoDB, use caching (like Redis) for frequent queries, and ensure API responses are paginated. I also use compression middleware in Express and optimize assets with Webpack or Vite.",
    },
  ],
  behavioralQuestions: [
    {
      question: "Describe a time you had to implement a feature from a Figma design that was technically challenging. How did you handle it?",
      intention: "To evaluate the candidate's ability to collaborate with UI/UX designers and their problem-solving skills.",
      answer: "The candidate should describe a specific UI component, the technical hurdle (e.g., complex animation or responsive constraints), and how they used CSS/React logic to achieve a pixel-perfect result while maintaining performance.",
    },
    {
      question: "Tell me about a situation where you found a critical bug during a code review or development. How did you resolve it?",
      intention: "To assess attention to detail and ability to work in an agile environment.",
      answer: "The candidate should explain the bug's impact (e.g., a data leak or a crash), the debugging tools used (Postman, Chrome DevTools), and the collaborative process of fixing and testing the solution.",
    },
  ],
  skillsGaps: [
    { skill: "TypeScript",                   severity: "medium" },
    { skill: "Next.js",                      severity: "medium" },
    { skill: "JWT/Auth Implementation",      severity: "low"    },
    { skill: "Docker / CI-CD Pipelines",     severity: "low"    },
  ],
  preparationPlans: [
    {
      day: "Day 1-2",
      focus: "Authentication & Security",
      tasks: [
        "Implement a full login/signup flow using JWT and Bcrypt",
        "Practice creating custom Express middleware for role-based access control",
        "Study Refresh Token rotation and secure cookie storage",
      ],
    },
    {
      day: "Day 3-4",
      focus: "Advanced React & Performance",
      tasks: [
        "Review React.memo, useCallback, and useMemo to explain performance optimization",
        "Build a small project or component using TypeScript to understand basic typing in React",
        "Refactor an existing project to use React Query for more efficient API fetching",
      ],
    },
    {
      day: "Day 5-6",
      focus: "Database & DevOps Basics",
      tasks: [
        "Practice complex MongoDB Aggregation pipelines",
        "Learn the basics of Docker (creating a Dockerfile for a Node.js app)",
        "Review GitHub Actions for basic CI/CD pipeline automation",
      ],
    },
    {
      day: "Day 7",
      focus: "Mock Interview & Soft Skills",
      tasks: [
        "Rehearse 'Tell me about yourself' focusing on MERN projects",
        "Prepare 3 specific examples of problem-solving from previous roles",
        "Do a final review of the company's tech stack and products",
      ],
    },
  ],
};

const NAV_ITEMS = [
  { key: "technical",  label: "Technical Questions", icon: "<>" },
  { key: "behavioral", label: "Behavioral Questions", icon: "💬" },
  { key: "roadmap",    label: "Road Map",             icon: "↗" },
];

const SEVERITY_LABEL = { high: "High", medium: "Medium", low: "Low" };

const Interview = ({
  data = SAMPLE_DATA,
  activeSection: activeSectionProp,
  onSectionChange,
}) => {
  // local fallback so component works standalone without a parent hook
  const [localSection, setLocalSection] = useState("technical");
  const activeSection = activeSectionProp ?? localSection;
  const handleSection = onSectionChange ?? setLocalSection;

  const {
    matchScore       = 0,
    technicalQuestions  = [],
    behavioralQuestions = [],
    skillsGaps          = [],
    preparationPlans    = [],
  } = data;

  const scoreCircumference = 2 * Math.PI * 26; // r=26

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

        {/* Match score */}
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

        {/* Skill gaps */}
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

/* ── QuestionCard ───────────────────────────────────────────────── */
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

/* ── RoadmapCard ────────────────────────────────────────────────── */
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