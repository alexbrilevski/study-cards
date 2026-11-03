import type { FC } from 'react';
import type { CardsPackListView } from '../PackList';
import DoubleRangeField from '../../../../main/ui/common/components/DoubleRangeField/DoubleRangeField';
import SearchField from '../../../../main/ui/common/components/SearchField/SearchField';
import { IconSvg } from '../../../../main/ui/common/components/IconSvg/IconSvg';
import clearFiltersIcon from '../../../../assets/icons/clear-filters.svg';
import s from './PackListHeader.module.css';

type PackListHeaderProps = {
  packName: string;
  min: number;
  max: number;
  minCardsCount: number;
  maxCardsCount: number;
  userId: string;
  onSearchByPackName: (packName: string) => void;
  onSelectPackListView: (view: CardsPackListView) => void;
  onCardsCountRangeChange: (value: [number, number]) => void;
  onClearFilters: () => void;
};

export const PackListHeader: FC<PackListHeaderProps> = ({
  packName,
  min,
  max,
  minCardsCount,
  maxCardsCount,
  userId,
  onSearchByPackName,
  onSelectPackListView,
  onCardsCountRangeChange,
  onClearFilters,
}) => {
  return (
    <div className={s['pack-list-header']}>
      <div className={s['pack-name-filter']}>
        <SearchField
          label={'Search by name'}
          placeholder={'Provide your text'}
          name={'packName'}
          value={packName}
          onChangeValue={onSearchByPackName}
        />
      </div>
      <div>
        <h2>Show cards packs</h2>
        <div className={s['pack-list-view-toggle']}>
          <button
            className={userId ? `${s['active']}` : undefined}
            onClick={() => onSelectPackListView('my')}
          >
            My
          </button>
          <button
            className={!userId ? `${s['active']}` : undefined}
            onClick={() => onSelectPackListView('all')}
          >
            All
          </button>
        </div>
      </div>
      <div className={s['cards-range-filter']}>
        <h2>Number of cards</h2>
        <DoubleRangeField
          min={min}
          max={max}
          rangeValues={[minCardsCount, maxCardsCount]}
          onChangeRange={onCardsCountRangeChange}
        />
      </div>
      <button className={s['clear-filters']} onClick={onClearFilters}>
        <IconSvg src={clearFiltersIcon} size={24} />
      </button>
    </div>
  );
};
