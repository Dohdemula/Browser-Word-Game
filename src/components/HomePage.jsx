import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game');
  };

  const handleMadeByClick = () => {
    window.open('https://github.com/Dohdemula', '_blank');
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
              <li>Press Enter to submit your answer</li>
              <li>Destroy asteroids before they reach your planet</li>
              <li>One collision = Game Over!</li>
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
          <button 
            className={`${styles.madeByButton} btn`}
            onClick={handleMadeByClick}
          >
            <svg className={styles.githubIcon} viewBox="0 0 24 24" fill="var(--text-white)">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Made by DENNIS MBUNO
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 