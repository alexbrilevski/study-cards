import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import s from './Button.module.css';

type DefaultButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonProps = DefaultButtonProps & {
  red?: boolean,
};

const Button: FC<ButtonProps> = ({
  red,
  className,
  children,
  ...restProps
}) => {
  const finalClassName = `${s['default']} ${red ? s['red'] : ''} ${className ? className : ''}`;

  return (
    <button
      className={finalClassName}
      {...restProps}>
      {children}
    </button>
  );
};

export default Button;
