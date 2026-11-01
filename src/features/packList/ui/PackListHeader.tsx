import type { FC } from 'react';
import DoubleRangeField from '../../../main/ui/common/components/DoubleRangeField/DoubleRangeField';

type PackListHeaderProps = {
  minCardsCount: number;
  maxCardsCount: number;
  onCardsCountRangeChange: (value: [number, number]) => void;
};

export const PackListHeader: FC<PackListHeaderProps> = ({
  minCardsCount,
  maxCardsCount,
  onCardsCountRangeChange,
}) => {
  return (
    <div>
      <div>
        <h2>Number of cards</h2>
        <DoubleRangeField
          rangeValues={[minCardsCount, maxCardsCount]}
          onChangeRange={onCardsCountRangeChange}
          min={minCardsCount}
          max={maxCardsCount}
        />
      </div>
    </div>
  );
};
