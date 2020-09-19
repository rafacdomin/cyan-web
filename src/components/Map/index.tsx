import React, { useCallback, useMemo } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { FiTrash } from 'react-icons/fi';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import farmIcon from '../../assets/hill.svg';
import { Container, Content } from './styles';
import formatDate from '../../utils/formatDate';

interface MarkerProp {
  id: string;
  geography: {
    coordinates: Array<number>;
  };
  farm: {
    name: string;
    id: string;
    harvest: {
      id: string;
      start_date: Date;
      end_date: Date;
      mill: {
        user_id: string;
        id: string;
        name: string;
      };
    };
  };
}

interface MapProps {
  markers: Array<MarkerProp>;
  lat: number;
  lng: number;
  zoom: number;
}

const MapComponent: React.FC<MapProps> = ({ markers, lat, lng, zoom }) => {
  const { user } = useAuth();

  const handleRemoveField = useCallback((id, index) => {
    api.delete(`/map/fields/${id}`).then(() => {
      window.location.reload();
    });
  }, []);

  const myIcon = useMemo(
    () =>
      L.icon({
        iconUrl: '/farm.svg',
        iconSize: [35, 50],
        iconAnchor: [12.5, 50],
        popupAnchor: [6.25, -50],
      }),
    [],
  );

  return (
    <Map center={[lat, lng]} zoom={zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker
          key={marker.id}
          position={[
            marker?.geography.coordinates[0],
            marker?.geography.coordinates[1],
          ]}
          icon={myIcon}>
          <Popup>
            <Container>
              <img src={farmIcon} alt="farm" />
              <Content>
                <h1>
                  Mill: {marker.farm.harvest.mill.name}{' '}
                  <p>{marker.farm.harvest.mill.id}</p>
                </h1>
                <h2>
                  Harvest: <p>{marker.farm.harvest.id}</p>
                </h2>
                <div>
                  <p>Start: {formatDate(marker.farm.harvest.start_date)} </p>
                  <p>End: {formatDate(marker.farm.harvest.end_date)} </p>
                </div>
                <h3>
                  Farm: {marker.farm.name}
                  <p>{marker.farm.id}</p>
                </h3>

                <p>Field code: {marker.id}</p>
              </Content>
              {user?.id === marker.farm.harvest.mill.user_id && (
                <FiTrash
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleRemoveField(marker.id, index)}
                  size={20}
                  color="#c53030"
                />
              )}
            </Container>
          </Popup>
        </Marker>
      ))}
    </Map>
  );
};

export default MapComponent;
