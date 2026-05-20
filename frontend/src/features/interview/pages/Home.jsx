import React from "react";
import "../style/home.scss";

/**
 * UI LAYER — Home
 * Pure presentational component. No state, no side-effects.
 * All interactivity is wired in via props (from useInterviewForm hook).
 */
const Home = ({
  // Job description
  jobDescription = "",
  onJobDescriptionChange = () => {},
  jobDescriptionMax = 5000,

  // Resume
  resumeFile = null,
  onResumeChange = () => {},
  onResumeDrop = () => {},
  onResumeDragOver = () => {},

  // Self description
  selfDescription = "",
  onSelfDescriptionChange = () => {},

  // Submit
  onGenerate = () => {},
  isLoading = false,
}) => {
  const charCount = jobDescription.length;
  const resumeLabel = resumeFile ? resumeFile.name : null;

  return (
    <main className="home">

      {/* ── Page header ── */}
      <div className="home__header">
        <h1 className="home__title">
          Create Your Custom <span className="home__title-accent">Interview Plan</span>
        </h1>
        <p className="home__subtitle">
          Let our AI analyze the job requirements and your unique profile to build a winning strategy.
        </p>
      </div>

      {/* ── Card ── */}
      <div className="interview-input-group">

        {/* ── LEFT: Job Description ── */}
        <div className="left">
          <div className="input-group">

            <div className="input-group__header">
              <span className="input-group__icon">&#9776;</span>
              <label className="input-group__label" htmlFor="jobDescription">
                Target Job Description
              </label>
              <span className="badge badge--required">Required</span>
            </div>

            <textarea
              id="jobDescription"
              name="jobDescription"
              value={jobDescription}
              onChange={onJobDescriptionChange}
              placeholder={"Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"}
              maxLength={jobDescriptionMax}
            />

            <span className="input-group__char-count">
              {charCount} / {jobDescriptionMax.toLocaleString()} chars
            </span>

          </div>
        </div>

        {/* ── RIGHT: Profile ── */}
        <div className="right">

          <div className="right__header">
            <span className="input-group__icon">&#9786;</span>
            <span className="input-group__label">Your Profile</span>
          </div>

          {/* Resume upload */}
          <div className="input-group">
            <div className="input-group__header">
              <label className="input-group__label" htmlFor="resume">
                Upload Resume
              </label>
              <span className="badge badge--best">Best Results</span>
            </div>

            <label
              className={`file-label${resumeFile ? " file-label--uploaded" : ""}`}
              htmlFor="resume"
              onDrop={onResumeDrop}
              onDragOver={onResumeDragOver}
            >
              <span className="file-label__icon">
                {resumeFile ? "✓" : "↑"}
              </span>
              <span className="file-label__text">
                {resumeLabel
                  ? resumeLabel
                  : "Click to upload or drag & drop"}
              </span>
              {!resumeFile && (
                <span className="file-label__hint">PDF or DOCX (Max 5MB)</span>
              )}
            </label>

            <input
              hidden
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.docx"
              onChange={onResumeChange}
            />
          </div>

          {/* OR divider */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* Self description */}
          <div className="input-group">
            <label className="input-group__label" htmlFor="selfDescription">
              Quick Self-Description
            </label>
            <textarea
              id="selfDescription"
              name="selfDescription"
              value={selfDescription}
              onChange={onSelfDescriptionChange}
              placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
            />
          </div>

          {/* Hint */}
          <div className="hint-box">
            <span className="hint-box__dot" />
            <p className="hint-box__text">
              Either a <strong>Resume</strong> or a <strong>Self Description</strong> is
              required to generate a personalized plan.
            </p>
          </div>

        </div>

        {/* ── Footer bar ── */}
        <div className="card-footer">
          <span className="card-footer__meta">
            AI-Powered Strategy Generation &bull; Approx 30s
          </span>
          <button
            className="generate-btn button primary-button"
            onClick={onGenerate}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="generate-btn__spinner" />
            ) : (
              <span className="generate-btn__star">★</span>
            )}
            {isLoading ? "Generating..." : "Generate My Interview Strategy"}
          </button>
        </div>

      </div>
    </main>
  );
};

export default Home;