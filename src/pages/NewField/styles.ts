import styled from 'styled-components';
import colors from '../../styles/colors';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .map-newfield {
    width: 100%;
    height: 90.5vh;
    cursor: pointer;
    z-index: 0;
  }

  form {
    position: absolute;
    z-index: 100;
    bottom: 0;
    background: ${colors.secondary};
    width: 75rem;
    height: 25rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 2rem 2rem 0 0;
    border: 0.05rem solid ${colors.primary};
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);

    span {
      padding-top: 1.2rem;

      font-size: 2.4rem;
      color: ${colors.dark};
    }

    > div {
      padding-top: 1.2rem;

      display: flex;

      fieldset {
        border: 0;
        margin-right: 1.6rem;

        .date-picker {
          padding-left: 2.4rem;
          display: flex;
          align-items: center;
          height: 5.3rem;
          border: 0.05rem solid ${colors.grey};
          border-radius: 0.5rem;
          margin-bottom: 1.6rem;
        }
      }
    }

    button {
      height: 5rem;
      width: 30rem;
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

export const Pop = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  img {
    height: 3.5rem;
    width: 3.5rem;
  }
`;

export const Content = styled.div`
  margin-left: 1.6rem;

  h1 {
    font-size: 24px;
    color: ${colors.dark};
  }

  h2 {
    font-size: 16px;
    color: ${colors.dark};
  }

  h3 {
    font-size: 16px;
    color: ${colors.dark};
    margin-top: 0.4rem;
    margin-bottom: 0.8rem;
    padding-bottom: 0.8rem;
    border-bottom: 0.05rem dotted ${colors.primary};
  }

  p {
    font-size: 12px;
    color: ${colors.dark};
    margin: 0;
  }

  div {
    display: flex;
    > p {
      margin-right: 0.8rem;
    }
  }
`;
