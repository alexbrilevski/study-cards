import type { FC } from 'react';

type IconSvgProps = {
  src: string;
  size: number;
};

export const IconSvg: FC<IconSvgProps> = ({ src, size }) => {
  return <img src={src} width={size} height={size} alt='' aria-hidden='true' />;
};
