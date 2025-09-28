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
  return (
    <div className={className}>
      {word.split('').map((letter, index) => {
        const isVisible = guessed.includes(letter);
        const spanClass = [
          letterClassName,
          !isVisible && hiddenLetterClassName
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <span key={index} className={spanClass}>
            {isVisible ? letter : '_'}
          </span>
        );
      })}
    </div>
  );
}
