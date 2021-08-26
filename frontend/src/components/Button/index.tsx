import { ButtonHTMLAttributes, FC } from 'react';

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {};

const Button: FC<ButtonProps> = ({ children, ...args }) => {
  return (
    <button className="btn--primary" {...args}>
      {children}
    </button>
  );
};

export { Button };
