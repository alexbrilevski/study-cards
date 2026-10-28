import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import s from './Button.module.css';

type DefaultButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonVariant = 'contained' | 'outlined' | 'text';

type ButtonColor = 'primary' | 'white' | 'red';

type ButtonProps = DefaultButtonProps & {
  variant?: ButtonVariant;
  color?: ButtonColor;
};

const Button: FC<ButtonProps> = ({
  variant = 'text',
  color,
  className,
  children,
  ...restProps
}) => {
  const finalClassName = `${s['button']} ${s[variant]} ${color ? s[color] : ''} ${className ? className : ''}`;

  return (
    <button className={finalClassName} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
