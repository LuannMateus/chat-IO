import { FC, InputHTMLAttributes } from 'react';

import './styles.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {};

const Input: FC<InputProps> = ({ type, placeholder, ...rest }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      {...rest}
      className="input--primary"
    />
  );
};

export { Input };
