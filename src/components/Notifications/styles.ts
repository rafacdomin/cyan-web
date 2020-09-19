import styled, { css } from 'styled-components';
import PerfectScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import colors from '../../styles/colors';

interface NotificationListProps {
  visible: boolean;
}

interface BadgeProps {
  alert: boolean;
}

export const Container = styled.div`
  position: relative;
  z-index: 100;
`;

export const Badge = styled.button<BadgeProps>`
  background: none;
  border: 0;
  position: absolute;
  right: 0;
  margin: 2.4rem 3.6rem 0 0;
  opacity: 1;
  transition: opacity 0.2s;

  ${props =>
    props.alert &&
    css`
      &::after {
        position: absolute;
        right: 0;
        top: 0;
        width: 0.8rem;
        height: 0.8rem;
        background: #ff6f07;
        content: '';
        border-radius: 50%;
      }
    `}

  &:hover {
    opacity: 0.6;
  }
`;

export const NotificationList = styled.div<NotificationListProps>`
  position: absolute;
  width: 26rem;
  left: calc(80% - 11rem);
  top: calc(100% + 1rem);
  background: ${colors.secondary};
  border-radius: 0.4rem;
  padding: 1.5rem 0.5rem;
  display: ${props => (props.visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    right: -2rem;
    width: 0;
    height: 0;
    border-top: 2rem solid transparent;
    border-bottom: 2rem solid transparent;
    border-left: 2rem solid ${colors.secondary};
  }
`;

export const Scroll = styled(PerfectScrollBar)`
  max-height: 26rem;
  padding: 0.5rem 1.5rem;
`;
