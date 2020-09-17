import styled from 'styled-components';
import colors from '../../styles/colors';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;

  form {
    margin-top: 3.2rem;
    width: 36rem;
    height: 26rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 0.4rem;
    border: 0.05rem solid ${colors.primary};
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);

    a {
      align-self: flex-end;
      margin-right: 2.8rem;
      margin-top: 0.8rem;
      text-decoration: none;
      color: ${colors.primaryLighten};
      font-size: 1.2rem;
      transition: color 0.2s;

      &:hover {
        color: ${colors.primary};
      }
    }

    button {
      height: 5rem;
      width: 30rem;
      margin-top: 1.4rem;
      background: ${colors.primary};
      border: 0;
      border-radius: 0.5rem;
      color: ${colors.secondary};
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.08, colors.primary)};
      }
    }
  }
`;
