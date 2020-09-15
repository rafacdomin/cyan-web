import styled from 'styled-components';
import colors from '../../styles/colors';

export const Container = styled.header`
  height: 6rem;
  display: flex;
  justify-content: center;
  border-bottom: 0.5px solid ${colors.primary};

  > div {
    display: flex;
    flex: 1;
    padding: 0 16px;
    max-width: 36rem;

    align-items: center;
    justify-content: space-between;

    @media (min-width: 600px) {
      max-width: 110rem;
    }

    img {
      height: 3rem;
      width: 3rem;
      opacity: 1;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;

      .register {
        width: 14.4rem;
        height: 3.6rem;
        background: ${colors.secondary};
        border: 0.05rem solid ${colors.primary};
        border-radius: 0.5rem;
        margin-right: 0.8rem;
        font-size: 1.4rem;
        font-weight: 400;
        opacity: 1;
        transition: all 0.2s;

        &:hover {
          transform: translateY(-0.3rem);
          opacity: 0.8;
        }
      }

      .login {
        width: 9.6rem;
        height: 3.6rem;
        background: ${colors.primary};
        border: none;
        border-radius: 0.5rem;
        color: ${colors.secondary};
        font-size: 1.4rem;
        font-weight: 400;
        opacity: 1;
        transition: all 0.2s;

        &:hover {
          transform: translateY(-0.3rem);
          opacity: 0.8;
        }
      }
    }
  }
`;