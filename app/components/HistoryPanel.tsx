import React from 'react';

interface Props {
  correct: string[];
  wrong: string[];
  attemptsLeft: number;
  className?: string;
  correctClassName?: string;
  wrongClassName?: string;
}

const HistoryPanel: React.FC<Props> = ({
  correct,
  wrong,
  attemptsLeft,
  className,
  correctClassName,
  wrongClassName,
}) => {
  return (
    <div className={className}>
      <p>
        Tentativas restantes: <strong>{attemptsLeft}</strong>
      </p>

      <p>
        ✔️ Corretas:{' '}
        {correct.length > 0 ? (
          <>
            {correct.map((c) => (
              <span key={c} className={correctClassName} style={{ marginRight: '0.25rem' }}>
                {c}
              </span>
            ))}
          </>
        ) : (
          <em style={{ color: '#9ca3af' }}>nenhuma</em>
        )}
      </p>

      <p>
        ❌ Erradas:{' '}
        {wrong.length > 0 ? (
          <>
            {wrong.map((c) => (
              <span key={c} className={wrongClassName} style={{ marginRight: '0.25rem' }}>
                {c}
              </span>
            ))}
          </>
        ) : (
          <em style={{ color: '#9ca3af' }}>nenhuma</em>
        )}
      </p>
    </div>
  );
};

export default HistoryPanel;
