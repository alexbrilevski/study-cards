import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import s from './Button.module.css';

type DefaultButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonColor = 'primary' | 'white' | 'red';

type ButtonProps = DefaultButtonProps & {
  color?: ButtonColor,
};

const Button: FC<ButtonProps> = ({
  color = 'primary',
  className,
  children,
  ...restProps
}) => {
  const finalClassName = `${s['button']} ${s[color]} ${className ? className : ''}`;

  return (
    <button
      className={finalClassName}
      {...restProps}>
      {children}
    </button>
  );
};

export default Button;
