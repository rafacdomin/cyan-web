import React, { useCallback, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { Form } from '@unform/web';
import { DateRangePicker } from 'react-dates';

import { Container, SelectComponent } from './styles';
import Input from './components/Input';
import Header from '../../components/Header';
import moment from 'moment';

const myOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const Home: React.FC = () => {
  const [dateStart, setStartDate] = useState<moment.Moment | null>(null);
  const [dateEnd, setEndDate] = useState<moment.Moment | null>(null);
  const [inputfocus, setInputFocus] = useState<'startDate' | 'endDate' | null>(
    null,
  );

  const options = useCallback(
    async () => [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
    ],
    [],
  );

  const applyFilter = useCallback(
    async (data: any) => {
      console.log(data, dateStart, dateEnd);
    },
    [dateStart, dateEnd],
  );

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

  return (
    <>
      <Header />
      <Container>
        <Form onSubmit={applyFilter}>
          <FiFilter size={20} />
          <SelectComponent
            name="millName"
            placeholder="Select a Mill"
            className="react-select-container"
            classNamePrefix="react-select"
            loadOptions={options}
            defaultOptions={myOptions}
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
                console.log(startDate, endDate);
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
    </>
  );
};

export default Home;
