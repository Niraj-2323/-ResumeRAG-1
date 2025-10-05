import React, { useState } from 'react';
import UploadResume from './components/UploadResume';
import JobDescription from './components/JobDescription';
import Results from './components/Results';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('upload');
  const [results, setResults] = useState(null);
  const [jobDescription, setJobDescription] = useState('');

  const handleUploadSuccess = (uploadResult) => {
    console.log('Upload successful:', uploadResult);
    // Optionally switch to job description view
    setCurrentView('job');
  };

  const handleResults = (resultsData) => {
    setResults(resultsData);
    setJobDescription(resultsData.job_description);
    setCurrentView('results');
  };

  const handleBackToJob = () => {
    setCurrentView('job');
    setResults(null);
  };

  const handleBackToUpload = () => {
    setCurrentView('upload');
    setResults(null);
    setJobDescription('');
  };

  // Make updateResults available globally for the Results component
  window.updateResults = setResults;

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">🎯</span>
            ResumeRAG
          </h1>
          <p className="app-subtitle">AI-Powered Job-Resume Matching System</p>
        </div>
        
        <nav className="app-nav">
          <button 
            className={`nav-btn ${currentView === 'upload' ? 'active' : ''}`}
            onClick={() => setCurrentView('upload')}
          >
            📄 Upload
          </button>
          <button 
            className={`nav-btn ${currentView === 'job' ? 'active' : ''}`}
            onClick={() => setCurrentView('job')}
          >
            🔍 Match
          </button>
          <button 
            className={`nav-btn ${currentView === 'results' ? 'active' : ''}`}
            onClick={() => setCurrentView('results')}
            disabled={!results}
          >
            📊 Results
          </button>
        </nav>
      </header>

      <main className="app-main">
        <div className="main-content">
          {currentView === 'upload' && (
            <div className="view-container">
              <UploadResume onUploadSuccess={handleUploadSuccess} />
              
              <div className="view-actions">
                <button 
                  className="next-btn"
                  onClick={() => setCurrentView('job')}
                >
                  Next: Find Matches →
                </button>
              </div>
            </div>
          )}

          {currentView === 'job' && (
            <div className="view-container">
              <JobDescription onResults={handleResults} />
              
              <div className="view-actions">
                <button 
                  className="back-btn"
                  onClick={handleBackToUpload}
                >
                  ← Back to Upload
                </button>
              </div>
            </div>
          )}

          {currentView === 'results' && (
            <div className="view-container">
              <Results results={results} jobDescription={jobDescription} />
              
              <div className="view-actions">
                <button 
                  className="back-btn"
                  onClick={handleBackToJob}
                >
                  ← Back to Job Description
                </button>
                <button 
                  className="new-search-btn"
                  onClick={handleBackToUpload}
                >
                  🔄 New Search
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>© 2024 ResumeRAG - AI-Powered Resume Matching</p>
          <div className="footer-links">
            <span>Built with React & FastAPI</span>
            <span>•</span>
            <span>Powered by OpenAI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

