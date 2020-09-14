import React from 'react';

import { Container } from './styles';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <Container>
      <div>
        <Link to="/">
          <img src={logo} alt="cyan" />
        </Link>

        <div>
          <button className="register">REGISTER</button>
          <button className="login">LOGIN</button>
        </div>
      </div>
    </Container>
  );
};

export default Header;
