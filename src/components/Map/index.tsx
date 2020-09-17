import React, { useEffect, useMemo, useState } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import farmIcon from '../../assets/hill.svg';
import { Container, Content } from './styles';

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
        id: string;
        name: string;
      };
    };
  };
}

interface MapProps {
  markers: Array<MarkerProp>;
}

const MapComponent: React.FC<MapProps> = ({ markers }) => {
  const [latitude, setLatitude] = useState(-22);
  const [longitude, setLongitude] = useState(-44);

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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
      },
      err => {},
      {
        timeout: 3000,
      },
    );
  }, []);

  return (
    <Map center={[latitude, longitude]} zoom={2}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map(marker => (
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
                  <p>Start: 07/10/2019 </p>
                  <p>End: 07/10/2020 </p>
                </div>
                <h3>
                  Farm: {marker.farm.name}
                  <p>{marker.farm.id}</p>
                </h3>

                <p>Field code: {marker.id}</p>
              </Content>
            </Container>
          </Popup>
        </Marker>
      ))}
    </Map>
  );
};

export default MapComponent;
