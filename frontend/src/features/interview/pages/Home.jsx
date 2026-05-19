import React from "react";
import "../style/home.scss";

const Home = () => {
  return (
    <main className="home">
      <div className="interview-input-group">

        {/* Left Side */}
        <div className="left">
          <div className="input-group">
            <textarea
              name="jobDescription"
              id="jobDescription"
              placeholder="Enter job description here..."
            ></textarea>
          </div>
        </div>

        {/* Right Side */}
        <div className="right">

          {/* Resume Upload */}
          <div className="input-group">
            <p>Resume <small className="highlight">(Upload Resume and Self Description for best results)</small></p>
            <label className="file-label" htmlFor="resume">
              Upload Resume
            </label>

            <input
              hidden
              type="file"
              name="resume"
              id="resume"
              accept=".pdf"
            />
          </div>

          {/* Self Description */}
          <div className="input-group">
            <label htmlFor="selfDescription">
              Self Description
            </label>

            <textarea
              name="selfDescription"
              id="selfDescription"
              placeholder="Describe yourself in a few sentences..."
            ></textarea>
          </div>

          {/* Button */}
          <button className="generate-btn button primary-button">
            Generate Interview Report
          </button>

        </div>
      </div>
    </main>
  );
};

export default Home;