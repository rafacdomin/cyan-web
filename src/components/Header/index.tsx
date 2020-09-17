import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPlusCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

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
    history.push('/');
  }, [Logout, history]);

  const handleRegisterField = useCallback(() => {
    if (!user) {
      history.push('/login');

      toast.warn('You must login to add a new Field to the map', {
        position: toast.POSITION.TOP_RIGHT,
      });

      return;
    }

    history.push('/new-field');
  }, [user, history]);

  return (
    <Container>
      <div>
        <Link to="/">
          <img src={logo} alt="cyan" />
        </Link>

        <div>
          <button
            type="button"
            onClick={handleRegisterField}
            className="registerField">
            <FiPlusCircle size={18} color="#4787CD" />
            ADD NEW FIELD
          </button>
          {!user ? (
            <>
              <button
                type="button"
                onClick={handleRegister}
                className="register">
                REGISTER
              </button>
              <button type="button" onClick={handleLogin} className="login">
                LOGIN
              </button>
            </>
          ) : (
            <button type="button" onClick={handleLogout} className="login">
              LOGOUT
            </button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Header;
