import { useState, type FC } from 'react';
import type { Card } from '../../../main/types/card';
import Button from '../../../main/ui/common/components/Button/Button';

type LearnCardProps = {
  card: Card | null;
};

export const LearnCard: FC<LearnCardProps> = ({ card }) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  if (!card) {
    return <div>No cards found in this pack.</div>;
  }

  return (
    <div>
      <p>Question: {card.question}</p>
      {card.shots > 0 && <p>Number of attempts to answer the question: {card.shots}</p>}
      <div>
        {!showAnswer ? (
          <Button
            variant={'contained'}
            color={'primary'}
            onClick={() => setShowAnswer(true)}
          >
            Show answer
          </Button>
        ) : (
          <>
            <p>{card.answer}</p>
            <Button variant={'contained'} color={'primary'}>
              Next
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
