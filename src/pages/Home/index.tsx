import React, { useCallback, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { FiFilter } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

import api from '../../services/api';
import Input from './components/Input';
import Notifications from '../../components/Notifications';
import MapComponent from '../../components/Map';
import { Container, SelectComponent, Notification } from './styles';

interface NotificationProps {
  id: string;
  message: string;
  position: {
    lat: number;
    lng: number;
  };
}

interface Mill {
  id: string;
  name: string;
}

interface DataProps {
  mill?: string;
  farm?: string;
  field?: string;
  harvest?: string;
}

const Home: React.FC = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [zoom, setZoom] = useState(3);
  const [fields, setFields] = useState([]);
  const [options, setOptions] = useState([]);
  const [dateStart, setStartDate] = useState<moment.Moment | null>(null);
  const [dateEnd, setEndDate] = useState<moment.Moment | null>(null);
  const [inputfocus, setInputFocus] = useState<'startDate' | 'endDate' | null>(
    null,
  );
  const [notifications, setNotifications] = useState<Array<NotificationProps>>(
    [],
  );
  const [alert, setAlert] = useState(false);

  const formRef = useRef<FormHandles>(null);

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

    const socket = io(String(api.defaults.baseURL), {
      query: {
        platform: navigator.platform,
      },
    });

    socket.on('notification', (notification: NotificationProps) => {
      setNotifications(oldArray => [notification, ...oldArray]);
      setAlert(true);
      formRef.current?.submitForm();
    });
  }, [formRef]);

  const renderMonthElement = useCallback(
    ({ month, onMonthSelect, onYearSelect }: any) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <div style={{ marginRight: 8 }}>
          <select
            style={{ border: 'none', background: '#fff' }}
            value={month.month()}
            onChange={e => onMonthSelect(month, e.target.value)}>
            {moment.months().map((label, value) => (
              <option value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            style={{ border: 'none', background: '#fff' }}
            value={month.year()}
            onChange={e => onYearSelect(month, e.target.value)}>
            <option value={moment().year() - 3}>{moment().year() - 3}</option>
            <option value={moment().year() - 2}>{moment().year() - 2}</option>
            <option value={moment().year() - 1}>{moment().year() - 1}</option>
            <option value={moment().year()}>{moment().year()}</option>
            <option value={moment().year() + 1}>{moment().year() + 1}</option>
            <option value={moment().year() + 2}>{moment().year() + 2}</option>
            <option value={moment().year() + 3}>{moment().year() + 3}</option>
          </select>
        </div>
      </div>
    ),
    [],
  );

  const handleNotificationClick = useCallback(notification => {
    setLat(notification.position.lat);
    setLng(notification.position.lng);
    setZoom(8);
  }, []);

  const applyFilter = useCallback(
    async (data: DataProps) => {
      try {
        const response = await api.get('/map/fields', {
          params: {
            farm: data.farm,
            mill: data.mill,
            field: data.field,
            harvest: data.harvest,
            start_day: dateStart,
            end_day: dateEnd,
          },
        });
        formRef.current?.clearField('mill');
        setFields(response.data);
      } catch (err) {
        console.log(err);
      }
    },
    [dateStart, dateEnd],
  );

  return (
    <>
      <Container>
        <Form ref={formRef} onSubmit={applyFilter}>
          <FiFilter size={20} />
          <SelectComponent
            name="mill"
            placeholder="Select a Mill"
            defaultOptions={options}
          />
          <div className="date-picker">
            <DateRangePicker
              small
              noBorder
              hideKeyboardShortcutsPanel
              isOutsideRange={() => false}
              renderMonthElement={renderMonthElement}
              startDate={dateStart} // momentPropTypes.momentObj or null,
              startDateId="start_id" // PropTypes.string.isRequired,
              endDate={dateEnd} // momentPropTypes.momentObj or null,
              endDateId="end_id" // PropTypes.string.isRequired,
              onDatesChange={({ startDate, endDate }) => {
                setStartDate(startDate);
                setEndDate(endDate);
              }} // PropTypes.func.isRequired,
              focusedInput={inputfocus} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={focusedInput => {
                setInputFocus(focusedInput);
              }} // PropTypes.func.isRequired,
            />
          </div>

          <Input name="harvest" type="text" placeholder="Harvest code" />
          <Input name="farm" type="text" placeholder="Farm code/name" />
          <Input name="field" type="text" placeholder="Field code" />

          <button type="submit">Apply filters</button>
        </Form>
      </Container>

      <div className="map">
        <Notifications alert={alert}>
          {notifications.length > 0 &&
            notifications.map(notification => (
              <Notification
                key={notification.id}
                onMouseEnter={() => setAlert(false)}>
                <p>{notification.message}</p>
                <button onClick={() => handleNotificationClick(notification)}>
                  Check it here!
                </button>
              </Notification>
            ))}
        </Notifications>

        <MapComponent lat={lat} lng={lng} zoom={zoom} markers={fields} />
      </div>
    </>
  );
};

export default Home;
