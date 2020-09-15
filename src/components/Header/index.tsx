import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import logo from '../../assets/logo.png';
import { Container } from './styles';

const Header: React.FC = () => {
  const { user, Logout } = useAuth();
  const history = useHistory();

  const handleRegister = useCallback(() => {
    history.push('/register');
  }, [history]);

  const handleLogin = useCallback(() => {
    history.push('/login');
  }, [history]);

  const handleLogout = useCallback(() => {
    Logout();
  }, [Logout]);

  return (
    <Container>
      <div>
        <Link to="/">
          <img src={logo} alt="cyan" />
        </Link>

        {!user ? (
          <div>
            <button onClick={handleRegister} className="register">
              REGISTER
            </button>
            <button onClick={handleLogin} className="login">
              LOGIN
            </button>
          </div>
        ) : (
          <div>
            <button onClick={handleLogout} className="login">
              LOGOUT
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Header;
