import styled, { css } from 'styled-components';
import colors from '../../../../styles/colors';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  margin-left: 0.8rem;
  background: ${colors.secondary};
  border-radius: 0.5rem;
  padding: 1.6rem;
  width: 16rem;
  height: 4.8rem;
  border: 0.05rem solid #ccc;
  display: flex;
  align-items: center;

  ${props =>
    props.isFocused &&
    css`
      border-color: ${colors.primary};
      border-width: 0.2rem;
      color: ${colors.primary};
    `}

  ${props =>
    props.isFilled &&
    css`
      color: ${colors.primary};
    `}

  input {
    width: 100%;
    background: transparent;
    border: 0;
    color: ${colors.dark};
    font-size: 1.4rem;
    &::placeholder {
      color: ${colors.grey};
    }
  }
`;
