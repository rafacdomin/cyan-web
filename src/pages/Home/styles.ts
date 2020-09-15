import { shade } from 'polished';
import styled from 'styled-components';
import colors from '../../styles/colors';
import Select from '../../components/Select';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    flex: 1;
    display: flex;
    align-items: center;
    max-width: 110rem;
    padding: 0 1.6rem;
    margin: 3.6rem 0 2.4rem;

    svg {
      margin-right: 1.6rem;
    }

    button {
      height: 4.8rem;
      width: 12rem;
      border-radius: 0.5rem;
      margin-left: 0.8rem;
      background: ${colors.primary};
      border: none;
      color: ${colors.secondary};
      transition: background-color 0.2s;
      font-size: 1.4rem;

      &:hover {
        background-color: ${shade(0.08, colors.primary)};
      }
    }

    .date-picker {
      padding: 0 1.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0.05rem solid #ccc;
      border-radius: 0.5rem;
      height: 4.8rem;
    }
  }
`;

export const SelectComponent = styled(Select)`
  margin-right: 0.8rem;
  font-size: 1.4rem;

  .react-select__control {
    height: 4.8rem;
    min-height: 4.8rem;
    width: 16.5rem;
  }
`;
