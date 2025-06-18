// Word list for asteroids - different difficulty levels
export const wordList = {
  easy: [
    'cat', 'dog', 'run', 'jump', 'play', 'eat', 'sleep', 'walk', 'talk', 'sing',
    'book', 'tree', 'star', 'moon', 'sun', 'bird', 'fish', 'home', 'work', 'love',
    'happy', 'sad', 'big', 'small', 'fast', 'slow', 'hot', 'cold', 'new', 'old',
    'good', 'bad', 'up', 'down', 'in', 'out', 'on', 'off', 'yes', 'no'
  ],
  medium: [
    'planet', 'asteroid', 'galaxy', 'universe', 'spaceship', 'rocket', 'cosmos',
    'nebula', 'meteor', 'comet', 'satellite', 'orbit', 'gravity', 'velocity',
    'momentum', 'energy', 'matter', 'space', 'time', 'light', 'dark', 'bright',
    'distant', 'nearby', 'massive', 'tiny', 'powerful', 'fragile', 'ancient',
    'modern', 'future', 'past', 'present', 'eternal', 'temporary', 'infinite'
  ],
  hard: [
    'supernova', 'blackhole', 'quasar', 'pulsar', 'neutron', 'photon', 'electron',
    'molecule', 'atom', 'particle', 'radiation', 'spectrum', 'wavelength',
    'frequency', 'amplitude', 'resonance', 'oscillation', 'trajectory',
    'acceleration', 'deceleration', 'centrifugal', 'centripetal', 'momentum',
    'kinetic', 'potential', 'thermal', 'nuclear', 'fission', 'fusion', 'plasma'
  ]
};

// Get a random word from any difficulty level
export const getRandomWord = () => {
  const allWords = [...wordList.easy, ...wordList.medium, ...wordList.hard];
  return allWords[Math.floor(Math.random() * allWords.length)];
};

// Get a word from a specific difficulty level
export const getWordByDifficulty = (difficulty) => {
  const words = wordList[difficulty] || wordList.easy;
  return words[Math.floor(Math.random() * words.length)];
}; 