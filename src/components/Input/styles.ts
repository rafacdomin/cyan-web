import styled, { css } from 'styled-components';
import colors from '../../styles/colors';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isError: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${colors.secondary};
  border-radius: 0.5rem;
  padding: 1.6rem;
  width: 30rem;
  border: 0.5px solid ${colors.grey};
  display: flex;
  align-items: center;

  ${props =>
    props.isError &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: ${colors.primary};
      color: ${colors.primary};
    `}

  ${props =>
    props.isFilled &&
    css`
      color: ${colors.primary};
    `}

  & + div {
    margin-top: 1.6rem;
  }

  input {
    margin: 0 0.8rem 0 1.6rem;
    width: 70%;
    background: transparent;
    border: 0;
    color: ${colors.dark};
    &::placeholder {
      color: ${colors.grey};
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 2rem;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: ${colors.secondary};
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
