import type { FC } from 'react';
import DoubleRangeField from '../../../main/ui/common/components/DoubleRangeField/DoubleRangeField';
import type { CardsPackListView } from './PackList';

type PackListHeaderProps = {
  minCardsCount: number;
  maxCardsCount: number;
  onCardsCountRangeChange: (value: [number, number]) => void;
  onSelectPackListView: (view: CardsPackListView) => void;
};

export const PackListHeader: FC<PackListHeaderProps> = ({
  minCardsCount,
  maxCardsCount,
  onCardsCountRangeChange,
  onSelectPackListView,
}) => {
  return (
    <div>
      <div>
        <h2>Show cards packs</h2>
        <div>
          <button onClick={() => onSelectPackListView('my')}>My</button>
          <button onClick={() => onSelectPackListView('all')}>All</button>
        </div>
      </div>
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
