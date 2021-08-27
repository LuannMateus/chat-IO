import { Link } from 'react-router-dom';
import './styles.scss';

const Header = () => {
  return (
    <header id="header">
      <Link to="/" className="header__title">
        <h1 className="header__title">Chat IO</h1>
      </Link>
    </header>
  );
};

export { Header };
