import type { FC } from 'react';

type IconSvgProps = {
  src: string;
  size: number;
  className?: string;
};

export const IconSvg: FC<IconSvgProps> = ({ src, className, size }) => {
  return (
    <img
      src={src}
      className={className}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
    />
  );
};
