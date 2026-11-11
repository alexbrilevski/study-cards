import type { FC } from 'react';
import { IconSvg } from '../IconSvg/IconSvg';
import starIcon from '../../../../../assets/icons/star.svg';
import starFilledIcon from '../../../../../assets/icons/star-filled.svg';
import s from './Grade.module.css';

type GradeProps = {
  value: number;
  max?: number;
  size?: number;
};

const Grade: FC<GradeProps> = ({ value, max = 5, size = 14 }) => {
  return (
    <div
      className={s['grade']}
      role="img"
      aria-label={`Grade ${value.toFixed(1)} out of ${max}`}
    >
      {Array.from({ length: max }, (_, i) => {
        const fill = Math.min(Math.max(value - i, 0), 1) * 100;

        return (
          <span key={i} className={s['star']}>
            <IconSvg src={starIcon} size={size} />
            {fill > 0 && (
              <span className={s['fill']} style={{ width: `${fill}%` }}>
                <IconSvg src={starFilledIcon} size={size} />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Grade;
