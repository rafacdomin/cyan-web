import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import moment from 'moment';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import * as Yup from 'yup';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DateRangePicker } from 'react-dates';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import farmIcon from '../../assets/hill.svg';
import { Container, Content, Pop } from './styles';

interface FormData {
  mill: string;
  farm: string;
  harvest?: string;
}

interface MarkerProp {
  id: string;
  geography: {
    coordinates: Array<number>;
  };
  farm: {
    name: string;
    id: string;
    harvest: {
      id: string;
      start_date: Date;
      end_date: Date;
      mill: {
        id: string;
        name: string;
      };
    };
  };
}

interface NewFieldProp {
  lat: number;
  lng: number;
}

const NewField: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState(-22);
  const [longitude, setLongitude] = useState(-44);
  const [newField, setNewField] = useState<NewFieldProp | null>();
  const [fields, setFields] = useState([]);
  const [dateStart, setStartDate] = useState<moment.Moment | null>(null);
  const [dateEnd, setEndDate] = useState<moment.Moment | null>(null);
  const [inputfocus, setInputFocus] = useState<'startDate' | 'endDate' | null>(
    null,
  );

  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

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

  const myIcon = useMemo(
    () =>
      L.icon({
        iconUrl: '/farm.svg',
        iconSize: [35, 50],
        iconAnchor: [12.5, 50],
        popupAnchor: [6.25, -50],
      }),
    [],
  );

  const newIcon = useMemo(
    () =>
      L.icon({
        iconUrl: '/hill.svg',
        iconSize: [35, 50],
        iconAnchor: [12.5, 50],
        popupAnchor: [6.25, -50],
      }),
    [],
  );

  useEffect(() => {
    api.get('/map/fields').then(({ data }) => {
      setFields(data);
    });

    navigator.geolocation.getCurrentPosition(
      pos => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
      },
      err => {},
      {
        timeout: 3000,
      },
    );
  }, []);

  const handleMapClick = useCallback(coordinates => {
    setNewField({ lat: coordinates.lat, lng: coordinates.lng });
  }, []);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          mill: Yup.string().required('Mill name or code is required'),
          farm: Yup.string().required('Farm name or code is required'),
          harvest: Yup.string(),
        });

        const geometrySchema = Yup.object().shape({
          lat: Yup.number().required(),
          lng: Yup.number().required(),
        });

        const dateSchema = Yup.object().shape({
          start_date: Yup.date().required(),
          end_date: Yup.date().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await geometrySchema.validate(newField, { abortEarly: false });

        await dateSchema.validate(
          { start_date: dateStart, end_date: dateEnd },
          { abortEarly: false },
        );

        await api.post('/map/fields', {
          latitude: newField?.lat,
          longitude: newField?.lng,
          farm: data.farm,
          harvest: data.harvest,
          start_date: dateStart,
          end_date: dateEnd,
          mill: data.mill,
        });

        toast.success('Field added successful', {
          position: toast.POSITION.TOP_RIGHT,
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

        toast.error('Server error, something went wrong', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    },
    [history, dateEnd, dateStart, newField],
  );

  return (
    <Container>
      <Map
        onclick={e => handleMapClick(e.latlng)}
        className="map-newfield"
        center={[latitude, longitude]}
        zoom={4}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {!!newField && (
          <Marker position={[newField.lat, newField.lng]} icon={newIcon} />
        )}

        {fields.map((marker: MarkerProp) => (
          <Marker
            key={marker.id}
            position={[
              marker?.geography.coordinates[0],
              marker?.geography.coordinates[1],
            ]}
            icon={myIcon}>
            <Popup>
              <Pop>
                <img src={farmIcon} alt="farm" />
                <Content>
                  <h1>
                    Mill: {marker.farm.harvest.mill.name}{' '}
                    <p>{marker.farm.harvest.mill.id}</p>
                  </h1>
                  <h2>
                    Harvest: <p>{marker.farm.harvest.id}</p>
                  </h2>
                  <div>
                    <p>Start: 07/10/2019 </p>
                    <p>End: 07/10/2020 </p>
                  </div>
                  <h3>
                    Farm: {marker.farm.name}
                    <p>{marker.farm.id}</p>
                  </h3>

                  <p>Field code: {marker.id}</p>
                </Content>
              </Pop>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <span hidden={!!newField}>Select a place on the map!</span>
        <div>
          <fieldset>
            <Input name="farm" type="text" placeholder="Farm Name/Code" />
            <Input name="mill" type="text" placeholder="Mill Name/Code" />
          </fieldset>

          <fieldset>
            <Input name="harvest" type="text" placeholder="Harvest Code" />
            <div className="date-picker">
              <DateRangePicker
                openDirection="up"
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
          </fieldset>
        </div>

        <button disabled={!(dateStart && dateEnd && newField)} type="submit">
          {loading ? (
            <Loader type="TailSpin" color="#fff" height={24} width={24} />
          ) : (
            'Send'
          )}
        </button>
      </Form>
    </Container>
  );
};

export default NewField;
