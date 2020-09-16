import React, { useCallback, useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { Form } from '@unform/web';

import api from '../../services/api';
import Input from './components/Input';
import Notifications from '../../components/Notifications';
import MapComponent from '../../components/Map';
import DatePicker from '../../components/DatePicker';
import { Container, SelectComponent } from './styles';

const myOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const Home: React.FC = () => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    api.get('/map/fields').then(({ data }) => {
      setFields(data);
    });
  }, []);

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

        <MapComponent markers={fields} />
      </div>
    </>
  );
};

export default Home;
