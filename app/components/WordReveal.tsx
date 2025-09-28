interface Props { 
  word: string;
  guessed: string[];
  className?: string;
  letterClassName?: string;
  hiddenLetterClassName?: string;
}

export default function WordReveal({
  word,
  guessed,
  className,
  letterClassName = '',
  hiddenLetterClassName = '',
}: Props) {
  // Estilos inline para a demo
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    fontFamily: 'monospace',
    fontSize: '2.5rem',
    justifyContent: 'center',
  };

  const letterStyle: React.CSSProperties = {
    borderBottom: '3px solid #22c55e', // verde vibrante
    color: '#22c55e',
    width: '40px',
    textAlign: 'center',
    userSelect: 'none',
  };

  const hiddenLetterStyle: React.CSSProperties = {
    color: 'transparent',
    textShadow: '0 0 8px rgba(34, 197, 94, 0.5)',
  };

  return (
    <div className={className} style={containerStyle}>
      {word.split('').map((letter, index) => {
        const isVisible = guessed.includes(letter);
        const combinedClass = [
          letterClassName,
          !isVisible ? hiddenLetterClassName : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <span
            key={index}
            className={combinedClass}
            style={isVisible ? letterStyle : {...letterStyle, ...hiddenLetterStyle}}
          >
            {isVisible ? letter : '_'}
          </span>
        );
      })}
    </div>
  );
}
