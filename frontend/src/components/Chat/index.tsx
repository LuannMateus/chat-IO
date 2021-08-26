import { FC } from 'react';

import './styles.scss';

const Chat: FC = ({ children }) => {
  return <section className="main__global-chat">{children}</section>;
};

export { Chat };
