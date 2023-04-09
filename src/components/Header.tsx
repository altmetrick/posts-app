import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { pathname } = useLocation();

  const options = [
    { path: '/', label: 'Home' },
    { path: '/post', label: 'Create Post' },
  ];

  const renderedLinks = options.map((option) => (
    <div className="nav-bar__box">
      <Link to={option.path}>{option.label}</Link>
    </div>
  ));

  return (
    <header>
      <h2>Posts App</h2>
      <nav className="nav-bar">{renderedLinks}</nav>
    </header>
  );
};

export default Header;
