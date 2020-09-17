import styled from 'styled-components';
import colors from '../../styles/colors';

export const Container = styled.div`
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
    font-weight: normal;
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
