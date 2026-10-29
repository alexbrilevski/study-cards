import type { FC } from 'react';
import { IconSvg } from '../IconSvg/IconSvg';
import arrowRightIcon from '../../../../../assets/icons/arrow-right.svg';
import s from './ButtonBack.module.css';

type ButtonBackProps = {
  caption?: string;
  onClick: () => void;
};

const ButtonBack: FC<ButtonBackProps> = ({ caption, onClick }) => {
  return (
    <button className={s['button-back']} onClick={onClick}>
      <IconSvg src={arrowRightIcon} size={24} />
      {caption && <span>{caption}</span>}
    </button>
  );
};

export default ButtonBack;
