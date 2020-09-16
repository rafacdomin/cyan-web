import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import cyan from '../../assets/cyan.svg';
import { Container } from './styles';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { Login } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().email().required('Email is required'),
          password: Yup.string().required('Password is required'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await Login({
          email: data.email,
          password: data.password,
        });

        setLoading(false);

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          setLoading(false);

          return;
        }

        setLoading(false);

        toast.error('Something went wrong, check your credentials', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    },
    [Login, history],
  );

  return (
    <Container>
      <img src={cyan} alt="cyan agroanalytics" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="E-mail" icon={FiMail} />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          icon={FiLock}
        />

        <Link to="/">Forgot your password?</Link>
        <button disabled={loading} type="submit">
          {loading ? (
            <Loader type="TailSpin" color="#fff" height={24} width={24} />
          ) : (
            'Login'
          )}
        </button>
      </Form>
    </Container>
  );
};

export default Login;
