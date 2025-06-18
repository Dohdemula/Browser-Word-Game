import React, { useState, useEffect, useRef } from 'react';
import styles from './GameUI.module.css';

const GameUI = ({ score, onWordSubmit, gameOver, onRestart, onBackToMenu }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!gameOver) {
      inputRef.current?.focus();
    }
  }, [gameOver]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsTyping(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onWordSubmit(inputValue.trim());
      // Always clear the input after pressing Enter
      setInputValue('');
      setIsTyping(false);
    }
  };

  const handleBlur = () => {
    setIsTyping(false);
  };

  const handleFocus = () => {
    setIsTyping(true);
  };

  return (
    <div className={styles.gameUI}>
      {/* Top UI */}
      <div className={styles.topUI}>
        <div className={styles.scoreContainer}>
          <div className={styles.scoreLabel}>SCORE</div>
          <div className={styles.scoreValue}>{score}</div>
        </div>
        
        <div className={styles.controls}>
          <button 
            className={`${styles.controlBtn} btn`}
            onClick={onBackToMenu}
          >
            MENU
          </button>
        </div>
      </div>

      {/* Input Area */}
      {!gameOver && (
        <div className={styles.inputArea}>
          <div className={styles.inputContainer}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              onBlur={handleBlur}
              onFocus={handleFocus}
              className={`${styles.wordInput} input`}
              placeholder="Type the word on the asteroid..."
              autoComplete="off"
              spellCheck="false"
            />
            <div className={`${styles.typingIndicator} ${isTyping ? styles.active : ''}`}>
              <div className={styles.cursor}></div>
            </div>
          </div>
          <div className={styles.instruction}>
            Press ENTER to destroy asteroid
          </div>
        </div>
      )}

      {/* Game Over Screen */}
      {gameOver && (
        <div className={styles.gameOver}>
          <div className={styles.gameOverContent}>
            <h2 className={styles.gameOverTitle}>GAME OVER</h2>
            <div className={styles.finalScore}>
              Final Score: <span className={styles.scoreHighlight}>{score}</span>
            </div>
            <div className={styles.gameOverButtons}>
              <button 
                className={`${styles.gameOverBtn} btn`}
                onClick={onRestart}
              >
                PLAY AGAIN
              </button>
              <button 
                className={`${styles.gameOverBtn} btn`}
                onClick={onBackToMenu}
              >
                MAIN MENU
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameUI; 