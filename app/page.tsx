'use client';

import { useState, useEffect, useCallback } from 'react';
import HangmanSVG from './components/HangmanSVG';
import WordReveal from './components/WordReveal';
import Keyboard from './components/Keyboard';
import HistoryPanel from './components/HistoryPanel';

import styles from './Hangman.module.css';

import { getRandomWord, alphabet, maxErrors } from '../utils/gameConfig';

export default function Page() {
  const [secretWord, setSecretWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [attemptsLeft, setAttemptsLeft] = useState(maxErrors);
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  // Inicializa o jogo
  const startNewGame = useCallback(() => {
    const word = getRandomWord();
    setSecretWord(word);
    setGuessedLetters([]);
    setWrongLetters([]);
    setAttemptsLeft(maxErrors);
    setStatus('playing');
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  // Trata o chute de uma letra
  const handleGuess = (letter: string) => {
    if (status !== 'playing') return;
    if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) return;

    if (secretWord.includes(letter)) {
      const updatedGuessed = [...guessedLetters, letter];
      setGuessedLetters(updatedGuessed);

      const hasWon = secretWord.split('').every((l) => updatedGuessed.includes(l));
      if (hasWon) setStatus('won');
    } else {
      const updatedWrong = [...wrongLetters, letter];
      const remainingAttempts = attemptsLeft - 1;

      setWrongLetters(updatedWrong);
      setAttemptsLeft(remainingAttempts);

      if (remainingAttempts <= 0) setStatus('lost');
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Jogo da Forca</h1>

      <HangmanSVG errors={maxErrors - attemptsLeft} className={styles.hangmanSVG} />

      <WordReveal word={secretWord} guessed={guessedLetters} />

      <Keyboard
        alphabet={alphabet}
        guessed={guessedLetters}
        wrong={wrongLetters}
        onGuess={handleGuess}
        disabled={status !== 'playing'}
        className={styles.keyboard}
        buttonClassName={styles.keyButton}
        guessedClassName={styles.correctKey}
        wrongClassName={styles.wrongKey}
      />

      <HistoryPanel
        correct={guessedLetters}
        wrong={wrongLetters}
        attemptsLeft={attemptsLeft}
        className={styles.historyPanel}
        correctClassName={styles.correctLetter}
        wrongClassName={styles.wrongLetter}
      />

      {status !== 'playing' && (
        <div className={styles.statusContainer}>
          {status === 'won' && (
            <p className={`${styles.statusMessage} ${styles.winMessage}`}>
              🎉 Parabéns! Você venceu!
            </p>
          )}
          {status === 'lost' && (
            <p className={`${styles.statusMessage} ${styles.loseMessage}`}>
              😢 Você perdeu. A palavra era <strong>{secretWord}</strong>.
            </p>
          )}
          <button onClick={startNewGame} className={styles.restartButton}>
            🔁 Reiniciar
          </button>
        </div>
      )}
    </main>
  );
}
