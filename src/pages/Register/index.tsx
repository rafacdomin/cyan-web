import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import cyan from '../../assets/cyan.svg';
import { Container } from './styles';

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const Register: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: FormData) => {
    try {
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
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
    }
  }, []);

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

        <button>Register</button>
      </Form>
    </Container>
  );
};

export default Register;
