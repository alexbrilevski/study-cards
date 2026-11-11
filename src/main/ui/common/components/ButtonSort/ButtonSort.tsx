import type { ButtonHTMLAttributes, DetailedHTMLProps, FC, MouseEvent } from 'react';
import { IconSvg } from '../IconSvg/IconSvg';
import triangleDown from '../../../../../assets/icons/triangle-down.svg';
import s from './ButtonSort.module.css';

type DefaultButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonSortProps = DefaultButtonProps & {
  sortParam: string;
  currentSorting: string;
  onSortClick: (sortPacks: string) => void;
};

const ButtonSort: FC<ButtonSortProps> = ({
  sortParam,
  currentSorting,
  className,
  onClick,
  onSortClick,
  children,
  ...props
}) => {
  const isActive = currentSorting.slice(1) === sortParam;
  const direction = isActive ? currentSorting[0] : '0';
  const finalClassName = `${s['button-sort']} ${isActive && direction === '1' ? s['up'] : ''} ${className ? className : ''}`;

  const onClickCallback = (e: MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e);
    onSortClick(`${direction === '0' ? 1 : 0}${sortParam}`);
  };

  return (
    <button className={finalClassName} onClick={onClickCallback} {...props}>
      <span>{children}</span>
      {isActive && <IconSvg src={triangleDown} size={10} />}
    </button>
  );
};

export default ButtonSort;
