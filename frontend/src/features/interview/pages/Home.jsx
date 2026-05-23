import React, { useRef, useState } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";

const Home = () => {
  const { loading, generateReport } = useInterview();
  const navigate = useNavigate();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const resumeInputRef = useRef();

  const jobDescriptionMax = 5000;
  const charCount = jobDescription.length;
  const resumeLabel = resumeFile ? resumeFile.name : null;

  const onJobDescriptionChange = (e) => setJobDescription(e.target.value);
  const onSelfDescriptionChange = (e) => setSelfDescription(e.target.value);
  const onResumeChange = (e) => setResumeFile(e.target.files[0] || null);
  const onResumeDragOver = (e) => e.preventDefault();
  const onResumeDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setResumeFile(file);
  };

  const onGenerate = async () => {
    const resume = resumeInputRef.current.files[0];
    const data = await generateReport({ jobDescription, selfDescription, resume });
    if (data?._id) navigate(`/interview/${data._id}`);
  };

  return (
    <main className="home">

      {/* ── Loading overlay ── */}
      {loading && (
        <div className="home__loading-overlay">
          <div className="home__loading-card">
            <div className="home__loading-spinner" />
            <p className="home__loading-title">Generating your report...</p>
            <p className="home__loading-sub">
              Our AI is analyzing your profile against the job requirements.
              This usually takes 20–30 seconds.
            </p>
            <div className="home__loading-steps">
              <span>📄 Reading resume</span>
              <span>🔍 Analyzing job fit</span>
              <span>✦ Building your plan</span>
            </div>
          </div>
        </div>
      )}

      <div className="home__header">
        <h1 className="home__title">
          Create Your Custom <span className="home__title-accent">Interview Plan</span>
        </h1>
        <p className="home__subtitle">
          Let our AI analyze the job requirements and your unique profile to build a winning strategy.
        </p>
      </div>

      <div className="interview-input-group">

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

        <div className="right">
          <div className="right__header">
            <span className="input-group__icon">&#9786;</span>
            <span className="input-group__label">Your Profile</span>
          </div>

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
              <span className="file-label__icon">{resumeFile ? "✓" : "↑"}</span>
              <span className="file-label__text">
                {resumeLabel ? resumeLabel : "Click to upload or drag & drop"}
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
              ref={resumeInputRef}
            />
          </div>

          <div className="divider"><span>OR</span></div>

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

          <div className="hint-box">
            <span className="hint-box__dot" />
            <p className="hint-box__text">
              Either a <strong>Resume</strong> or a <strong>Self Description</strong> is
              required to generate a personalized plan.
            </p>
          </div>
        </div>

        <div className="card-footer">
          <span className="card-footer__meta">
            AI-Powered Strategy Generation &bull; Approx 30s
          </span>
          <button
            className="generate-btn button primary-button"
            onClick={onGenerate}
            disabled={loading}
          >
            {loading ? (
              <span className="generate-btn__spinner" />
            ) : (
              <span className="generate-btn__star">★</span>
            )}
            {loading ? "Generating..." : "Generate My Interview Strategy"}
          </button>
        </div>

      </div>
    </main>
  );
};

export default Home;