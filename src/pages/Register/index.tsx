import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import cyan from '../../assets/cyan.svg';
import { Container } from './styles';
import api from '../../services/api';

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string()
            .min(3, 'Name must be at least 3 characters')
            .required('Name is required'),
          email: Yup.string().email().required('Email is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
          passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Passwords must match'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', {
          name: data.name,
          email: data.email,
          password: data.password,
        });

        toast.success('Registration successful. Please login', {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
        history.push('/login');
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
    [history],
  );

  return (
    <Container>
      <img src={cyan} alt="cyan agroanalytics" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Name" icon={FiUser} />
        <Input name="email" type="email" placeholder="E-mail" icon={FiMail} />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          icon={FiLock}
        />
        <Input
          name="passwordConfirm"
          type="password"
          placeholder="Confirm your password"
          icon={FiLock}
        />

        <button type="submit">
          {loading ? (
            <Loader type="TailSpin" color="#fff" height={24} width={24} />
          ) : (
            'Register'
          )}
        </button>
      </Form>
    </Container>
  );
};

export default Register;
