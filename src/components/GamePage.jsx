import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Asteroid from './Asteroid';
import Planet from './Planet';
import GameUI from './GameUI';
import { getRandomWord } from '../data/wordList';
import styles from './GamePage.module.css';

const GamePage = () => {
  const navigate = useNavigate();
  const [asteroids, setAsteroids] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [planetHit, setPlanetHit] = useState(false);
  const [planetHealth, setPlanetHealth] = useState(100);
  const [screenDimensions, setScreenDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const gameLoopRef = useRef(null);
  const spawnTimerRef = useRef(null);

  // Game configuration
  const GAME_SPEED = 1; // seconds per asteroid spawn
  const ASTEROID_FALL_TIME = 15; // seconds to reach planet
  const PLANET_RADIUS = 60; // radius of the planet in pixels (matches CSS: 120px diameter)
  const PLANET_BOTTOM_OFFSET = 20; // pixels from bottom (matches CSS: bottom: 20px)

  // Update screen dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setScreenDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate a new asteroid
  const createAsteroid = useCallback(() => {
    const word = getRandomWord();
    const x = Math.random() * 80 + 10; // start from 10% to 90% of screen width
    const size = Math.max(60, Math.min(120, word.length * 10)); // Larger size based on word length
    const speed = ASTEROID_FALL_TIME + (Math.random() * 2 - 1); // Slight variation in speed

    return {
      id: Date.now() + Math.random(),
      word,
      x,
      y: -10, // Start above screen
      size,
      speed,
      isDestroyed: false
    };
  }, []);

  // Spawn new asteroids
  const spawnAsteroid = useCallback(() => {
    if (!gameOver) {
      setAsteroids(prev => [...prev, createAsteroid()]);
    }
  }, [gameOver, createAsteroid]);

  // Handle word submission - now destroys immediately when word matches
  const handleWordSubmit = useCallback((submittedWord) => {
    let wasDestroyed = false;
    
    setAsteroids(prev => {
      const newAsteroids = [...prev];
      const asteroidIndex = newAsteroids.findIndex(
        asteroid => asteroid.word.toLowerCase() === submittedWord.toLowerCase() && !asteroid.isDestroyed
      );

      if (asteroidIndex !== -1) {
        // Destroy the asteroid immediately
        newAsteroids[asteroidIndex].isDestroyed = true;
        wasDestroyed = true;
        
        // Calculate score based on word length and asteroid size
        const asteroid = newAsteroids[asteroidIndex];
        const wordScore = asteroid.word.length * 10;
        const sizeBonus = Math.floor(asteroid.size / 10) * 5;
        const totalScore = wordScore + sizeBonus;
        
        setScore(prev => prev + totalScore);
        
        // Remove asteroid after explosion animation
        setTimeout(() => {
          setAsteroids(current => current.filter(a => a.id !== asteroid.id));
        }, 500);
      }

      return newAsteroids;
    });

    return wasDestroyed;
  }, []);

  // Check for collisions - only when asteroid actually hits the planet
  const checkCollisions = useCallback(() => {
    if (gameOver) return; // Don't check collisions if game is already over
    
    setAsteroids(prev => {
      const newAsteroids = [...prev];
      let collision = false;

      newAsteroids.forEach(asteroid => {
        if (!asteroid.isDestroyed) {
          // Calculate asteroid position in pixels using actual screen height
          const asteroidY = (asteroid.y / 100) * screenDimensions.height; // Convert percentage to pixels
          
          // Calculate planet's Y position (bottom of screen minus offset minus radius)
          const planetY = screenDimensions.height - PLANET_BOTTOM_OFFSET - PLANET_RADIUS;
          
          // Check if asteroid has reached the planet's Y level (with some tolerance)
          if (asteroidY >= planetY - PLANET_RADIUS - (asteroid.size / 2)) {
            // Calculate horizontal distance between asteroid and planet center
            const planetCenterX = 50; // Planet is centered at 50%
            const asteroidX = asteroid.x; // Asteroid X position in percentage
            const horizontalDistance = Math.abs(asteroidX - planetCenterX);
            
            // Convert planet radius to percentage based on screen width
            const planetRadiusPercent = (PLANET_RADIUS / screenDimensions.width) * 100;
            
            // Convert asteroid size to percentage based on screen width
            const asteroidSizePercent = (asteroid.size / screenDimensions.width) * 100;
            
            // Check if asteroid is within the planet's radius horizontally (including asteroid size)
            if (horizontalDistance <= planetRadiusPercent + (asteroidSizePercent / 2)) {
              // Actual collision detected!
              collision = true;
              asteroid.isDestroyed = true;
            }
          }
        }
      });

      if (collision) {
        // End game immediately on first collision - no delays
        setPlanetHit(true);
        setPlanetHealth(0);
        setGameOver(true);
        
        // Stop spawning new asteroids immediately
        if (spawnTimerRef.current) {
          clearInterval(spawnTimerRef.current);
          spawnTimerRef.current = null;
        }
        
        // Stop game loop immediately
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
          gameLoopRef.current = null;
        }
        
        // Reset planet hit effect after animation (but don't delay game over)
        setTimeout(() => setPlanetHit(false), 1000);
      }

      return newAsteroids;
    });
  }, [gameOver, screenDimensions.height, screenDimensions.width]);

  // Update asteroid positions
  const updateAsteroids = useCallback(() => {
    if (gameOver) return; // Don't update if game is over
    
    setAsteroids(prev => 
      prev.map(asteroid => ({
        ...asteroid,
        y: asteroid.y + (100 / (asteroid.speed * 60)) // Move down based on speed
      }))
    );
  }, [gameOver]);

  // Game loop
  const gameLoop = useCallback(() => {
    if (!gameOver) {
      updateAsteroids();
      checkCollisions();
    }
  }, [gameOver, updateAsteroids, checkCollisions]);

  // Start game
  useEffect(() => {
    // Start spawning asteroids
    spawnTimerRef.current = setInterval(spawnAsteroid, GAME_SPEED * 1000);
    
    // Start game loop
    gameLoopRef.current = setInterval(gameLoop, 1000 / 60); // 60 FPS

    return () => {
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [spawnAsteroid, gameLoop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, []);

  // Handle restart
  const handleRestart = () => {
    setAsteroids([]);
    setScore(0);
    setGameOver(false);
    setPlanetHit(false);
    setPlanetHealth(100);
    
    // Restart timers
    spawnTimerRef.current = setInterval(spawnAsteroid, GAME_SPEED * 1000);
    gameLoopRef.current = setInterval(gameLoop, 1000 / 60);
  };

  // Handle back to menu
  const handleBackToMenu = () => {
    navigate('/');
  };

  return (
    <div className={styles.gamePage}>
      {/* Asteroids */}
      {asteroids.map(asteroid => (
        <Asteroid
          key={asteroid.id}
          word={asteroid.word}
          x={asteroid.x}
          y={asteroid.y}
          size={asteroid.size}
          speed={asteroid.speed}
          isDestroyed={asteroid.isDestroyed}
        />
      ))}

      {/* Planet */}
      <Planet 
        isHit={planetHit}
        health={planetHealth}
      />

      {/* Game UI */}
      <GameUI
        score={score}
        onWordSubmit={handleWordSubmit}
        gameOver={gameOver}
        onRestart={handleRestart}
        onBackToMenu={handleBackToMenu}
      />
    </div>
  );
};

export default GamePage; 