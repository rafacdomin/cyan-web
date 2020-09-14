import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Container } from './styles';
import logo from '../../assets/logo.png';

const Header: React.FC = () => {
  const history = useHistory();

  const handleRegister = useCallback(() => {
    history.push('/register');
  }, [history]);

  const handleLogin = useCallback(() => {
    history.push('/login');
  }, [history]);

  return (
    <Container>
      <div>
        <Link to="/">
          <img src={logo} alt="cyan" />
        </Link>

        <div>
          <button onClick={handleRegister} className="register">
            REGISTER
          </button>
          <button onClick={handleLogin} className="login">
            LOGIN
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Header;
