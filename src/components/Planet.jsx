import React from 'react';
import styles from './Planet.module.css';

const Planet = ({ isHit, health }) => {
  return (
    <div className={`${styles.planet} ${isHit ? styles.hit : ''}`}>
      <div className={styles.planetBody}>
        <div className={styles.atmosphere}></div>
        <div className={styles.surface}>
          <div className={styles.continent}></div>
          <div className={styles.continent}></div>
          <div className={styles.continent}></div>
        </div>
        <div className={styles.shine}></div>
      </div>
      
      {isHit && (
        <div className={styles.impactEffect}>
          <div className={styles.shockwave}></div>
          <div className={styles.impactParticles}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className={styles.impactParticle}></div>
            ))}
          </div>
        </div>
      )}
      
      <div className={styles.healthBar}>
        <div 
          className={styles.healthFill} 
          style={{ width: `${health}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Planet; 