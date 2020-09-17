import React, { useCallback, useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { Form } from '@unform/web';

import api from '../../services/api';
import Input from './components/Input';
import Notifications from '../../components/Notifications';
import MapComponent from '../../components/Map';
import DatePicker from '../../components/DatePicker';
import { Container, SelectComponent } from './styles';

interface Mill {
  id: string;
  name: string;
}

const Home: React.FC = () => {
  const [fields, setFields] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    api.get('/map/fields').then(({ data }) => {
      setFields(data);
    });

    api.get('map/mills').then(({ data }) => {
      const mills = data.map((mill: Mill) => ({
        value: mill.id,
        label: mill.name,
      }));

      setOptions(mills);
    });
  }, []);

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
            defaultOptions={options}
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
