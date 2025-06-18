import React from 'react';
import styles from './Asteroid.module.css';

const Asteroid = ({ word, x, y, size, speed, isDestroyed }) => {
  const asteroidStyle = {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDuration: `${speed}s`
  };

  return (
    <div 
      className={`${styles.asteroid} ${isDestroyed ? styles.destroyed : ''}`}
      style={asteroidStyle}
    >
      <div className={styles.asteroidBody}>
        <div className={styles.word}>{word}</div>
      </div>
      {isDestroyed && (
        <div className={styles.explosion}>
          <div className={styles.explosionParticle}></div>
          <div className={styles.explosionParticle}></div>
          <div className={styles.explosionParticle}></div>
          <div className={styles.explosionParticle}></div>
          <div className={styles.explosionParticle}></div>
          <div className={styles.explosionParticle}></div>
        </div>
      )}
    </div>
  );
};

export default Asteroid; 