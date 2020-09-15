import React, { useCallback, useState } from 'react';

import { FiBell, FiExternalLink } from 'react-icons/fi';
import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './styles';

const Notifications: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const handleVisible = useCallback(() => {
    setVisible(state => !state);
  }, []);

  return (
    <Container>
      <Badge onClick={handleVisible}>
        <FiBell size={36} color="#4787CD" />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          <Notification>
            <p>New Field was added to Theodore's Farm!</p>
            <button>
              Check it here!
              <FiExternalLink size={16} color="#00AEEF" />
            </button>
          </Notification>
        </Scroll>
      </NotificationList>
    </Container>
  );
};

export default Notifications;
