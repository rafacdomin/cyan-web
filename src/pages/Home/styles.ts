import { shade } from 'polished';
import styled from 'styled-components';
import colors from '../../styles/colors';
import Select from '../../components/Select';

interface NotificationProps {
  unread?: boolean;
}

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 7rem;

  form {
    position: absolute;
    z-index: 100;
    top: 0;
    flex: 1;
    display: flex;
    align-items: center;
    max-width: 110rem;
    padding: 0 1.6rem;
    margin-top: 1.6rem;

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
      border: 0.5px solid #ccc;
      background: ${colors.secondary};
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

export const NewField = styled.div`
  overflow: hidden;
  position: absolute;
  z-index: 100;
  top: 100%;

  height: 4.8rem;
  width: 25rem;
  background: none;

  button {
    color: ${colors.secondary};
    background: ${colors.primary};
    border-radius: 0 1rem 0 0;
    border: 0;

    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    transform: translateY(3.3rem);
    transition: transform 0.2s;

    &:hover {
      transform: translateY(0);
    }
    svg {
      margin-right: 1.6rem;
    }
  }
`;

export const Notification = styled.section<NotificationProps>`
  color: ${colors.black};
  display: flex;
  flex-direction: column;

  & + section {
    margin-top: 1.6rem;
    padding-top: 1.6rem;
    border-top: 1px solid ${colors.primaryLighten};
  }

  p {
    max-width: 80%;
    font-size: 1.6rem;
  }

  button {
    align-self: flex-end;
    margin-top: 1.6rem;
    display: flex;
    align-items: center;

    font-size: 1.2rem;
    border: 0;
    background: none;
    color: ${colors.primaryLighten};

    svg {
      margin-left: 0.4rem;
    }
  }
`;
