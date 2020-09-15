import React, { useCallback } from 'react';
import { FiFilter, FiPlusCircle } from 'react-icons/fi';
import { Form } from '@unform/web';

import { useAuth } from '../../hooks/auth';
import Input from './components/Input';
import Header from '../../components/Header';
import Notifications from '../../components/Notifications';
import MapComponent from '../../components/Map';
import DatePicker from '../../components/DatePicker';
import { Container, SelectComponent, NewField } from './styles';
import { useHistory } from 'react-router-dom';

const myOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const Home: React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();

  const handleRegisterField = useCallback(() => {
    if (!user) {
      history.push('/login');
      return;
    }

    history.push('/register-filter');
  }, [user, history]);

  const options = useCallback(
    async () => [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
    ],
    [],
  );

  const applyFilter = useCallback(async (data: any) => {
    console.log(data);
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Form onSubmit={applyFilter}>
          <FiFilter size={20} />
          <SelectComponent
            name="millName"
            placeholder="Select a Mill"
            loadOptions={options}
            defaultOptions={myOptions}
          />
          <DatePicker />

          <Input name="harvest" type="text" placeholder="Harvest code" />
          <Input name="farm" type="text" placeholder="Farm code/name" />
          <Input name="field" type="text" placeholder="Field code" />

          <button type="submit">Apply filters</button>
        </Form>
      </Container>

      <div className="map">
        <Notifications />

        <NewField>
          <button type="button" onClick={handleRegisterField}>
            <FiPlusCircle size={18} color="#fff" />
            <p>Register new Field</p>
          </button>
        </NewField>

        <MapComponent />
      </div>
    </>
  );
};

export default Home;
