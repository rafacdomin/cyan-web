import styled from 'styled-components';
import PerfectScrollBar from 'react-perfect-scrollbar';
import colors from '../../styles/colors';

interface NotificationListProps {
  visible: boolean;
}

interface NotificationProps {
  unread?: boolean;
}

export const Container = styled.div`
  position: relative;
  z-index: 100;
`;

export const Badge = styled.button`
  background: none;
  border: 0;
  position: absolute;
  right: 0;
  margin: 2.4rem 3.6rem 0 0;
  opacity: 1;
  transition: opacity 0.2s;

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

  &:hover {
    opacity: 0.6;
  }
`;

export const NotificationList = styled.div<NotificationListProps>`
  position: absolute;
  width: 260px;
  left: calc(80% - 110px);
  top: calc(100% + 10px);
  background: ${colors.secondary};
  border-radius: 4px;
  padding: 15px 5px;
  display: ${props => (props.visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    right: -20px;
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid ${colors.secondary};
  }
`;

export const Scroll = styled(PerfectScrollBar)`
  max-height: 260px;
  padding: 5px 15px;
`;

export const Notification = styled.section<NotificationProps>`
  color: ${colors.black};
  display: flex;
  flex-direction: column;

  opacity: ${props => (props.unread ? 1 : 0.4)};

  & + section {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid ${colors.primaryLighten};
    opacity: ${props => (props.unread ? 1 : 0.4)};
  }

  p {
    max-width: 80%;
    font-size: 16px;
  }

  button {
    align-self: flex-end;
    margin-top: 16px;
    display: flex;
    align-items: center;

    font-size: 12px;
    border: 0;
    background: none;
    color: ${colors.primaryLighten};

    svg {
      margin-left: 4px;
    }
  }
`;
