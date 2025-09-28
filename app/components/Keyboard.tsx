import React from 'react';

interface Props {
  alphabet: string[];
  guessed: string[];
  wrong: string[];
  onGuess: (letter: string) => void;
  disabled: boolean;
  className?: string;
  buttonClassName?: string;
  guessedClassName?: string;
  wrongClassName?: string;
}

const Keyboard: React.FC<Props> = ({
  alphabet,
  guessed,
  wrong,
  onGuess,
  disabled,
  className,
  buttonClassName = '',
  guessedClassName = '',
  wrongClassName = '',
}) => {
  return (
    <div className={className}>
      {alphabet.map((letter) => {
        const isGuessed = guessed.includes(letter);
        const isWrong = wrong.includes(letter);
        const isTried = isGuessed || isWrong;

        const classes = [
          buttonClassName,
          isGuessed && guessedClassName,
          isWrong && wrongClassName,
          !isTried && 'hover:bg-gray-200 transition-colors',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={letter}
            onClick={() => onGuess(letter)}
            disabled={disabled || isTried}
            className={classes}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
