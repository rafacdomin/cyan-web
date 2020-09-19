import React, { useCallback, useState } from 'react';

import { FiBell } from 'react-icons/fi';
import { Container, Badge, NotificationList, Scroll } from './styles';

interface NotificationsProps {
  alert: boolean;
}

const Notifications: React.FC<NotificationsProps> = ({ children, alert }) => {
  const [visible, setVisible] = useState(false);

  const handleVisible = useCallback(() => {
    setVisible(state => !state);
  }, []);

  return (
    <Container>
      <Badge onClick={handleVisible} alert={alert}>
        <FiBell size={36} color="#4787CD" />
      </Badge>

      <NotificationList visible={!!(visible && !!children)}>
        <Scroll>{children}</Scroll>
      </NotificationList>
    </Container>
  );
};

export default Notifications;
