import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game');
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.talkative}>TALKATIVE</span>
          <span className={styles.planet}>PLANET</span>
        </h1>

        <div className={styles.subtitle}>
          <span className={styles.asterisk}>*</span>
          Your planet needs your voice to survive!
          <span className={styles.asterisk}>*</span>
        </div>

        <div className={styles.description}>
          <div className={styles.section}>
            <h2>🌌 The Story</h2>
            <p>
              You are a peaceful planet floating big empty space. Suddenly, 
              a deadly rain of asteroids threatens to destroy your world! 
              But there's hope - these asteroids carry mysterious words, 
              and by typing them correctly, you can destroy them before impact.
            </p>
          </div>

          <div className={styles.section}>
            <h2>🎮 How to Play</h2>
            <ul>
              <li>Asteroids will fall from space with words written on them</li>
              <li>Type the word exactly as shown on the asteroid</li>
              <li>Destroy asteroids before they reach your planet</li>
              <li>One collision = Game Over!</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>⚡ Tips</h2>
            <ul>
              <li>Focus on the closest asteroids first</li>
              <li>Don't panic - accuracy is more important than speed</li>
              <li>Watch out for longer words - they're worth more points!</li>
              <li>Your planet is counting on you!</li>
            </ul>
          </div>
        </div>

        <button 
          className={`${styles.startButton} btn glow`}
          onClick={handleStartGame}
        >
          START MISSION
        </button>

        <div className={styles.footer}>
          <p>Ready to save your planet? Let's go! 🚀</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 