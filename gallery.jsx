import React, { useEffect, useState } from 'react';
import TourCard from './tourcard';

const API_URL = "https://thingproxy.freeboard.io/fetch/https://course-api.com/react-tours-project";

const Gallery = ({ tours, setTours, onRemove }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState('light'); // Added theme toggle
  const [animatedRemoval, setAnimatedRemoval] = useState(null); // For exit animations

  // Enhanced fetch with simulated delay for better loading state visibility
  const fetchTours = async () => {
    try {
      setLoading(true);
      setError(false);
      
      const [response] = await Promise.all([
        fetch(API_URL),
        new Promise(resolve => setTimeout(resolve, 1500)) // Simulated delay
      ]);

      if (!response.ok) throw new Error("Failed to fetch tours");
      
      const data = await response.json();
      setTours(data);
      setAnimatedRemoval(null);

    } catch (err) {
      console.error('Fetch error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // New feature: Shuffle tours
  const shuffleTours = () => {
    setTours(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  // Enhanced remove with animation trigger
  const handleRemoveWithAnimation = (id) => {
    setAnimatedRemoval(id);
    setTimeout(() => onRemove(id), 500);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // New loading skeleton UI
  if (loading) {
    return (
      <div className={`skeleton-grid ${theme}`}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-image" />
            <div className="skeleton-text" />
            <div className="skeleton-text short" />
          </div>
        ))}
      </div>
    );
  }

  // Enhanced error UI
  if (error) {
    return (
      <div className={`error-state ${theme}`}>
        <div className="error-emoji">🌐❌</div>
        <h2>Connection Trouble</h2>
        <p>We couldn't reach the tour database.</p>
        <button 
          className="retry-button"
          onClick={fetchTours}
        >
          Retry Connection
        </button>
      </div>
    );
  }

  // Enhanced empty state
  if (tours.length === 0) {
    return (
      <div className={`empty-state ${theme}`}>
        <div className="empty-illustration">🛫</div>
        <h2>All Tours Explored!</h2>
        <p>Ready to discover fresh adventures?</p>
        <button 
          className="refresh-button"
          onClick={fetchTours}
        >
          Reload Journeys
        </button>
      </div>
    );
  }

  return (
    <div className={`gallery-container ${theme}`}>
      <div className="gallery-controls">
        <button 
          className="shuffle-button"
          onClick={shuffleTours}
        >
          🔀 Shuffle Tours
        </button>
        <button
          className="theme-toggle"
          onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      <div className="animated-grid">
        {tours.map((tour) => (
          <TourCard
            key={tour.id}
            {...tour}
            onRemove={handleRemoveWithAnimation}
            animateOut={animatedRemoval === tour.id}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;