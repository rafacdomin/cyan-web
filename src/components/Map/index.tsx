import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const myIcon = L.icon({
  iconUrl: '/farm.svg',
  iconSize: [35, 50],
  iconAnchor: [12.5, 50],
  popupAnchor: [0, -50],
});

const MapComponent: React.FC = () => {
  return (
    <Map center={[-22.7150256, -43.3777264]} zoom={3}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[-22.7150256, -43.3777264]} icon={myIcon}>
        <Popup>
          <div>
            <h1>Hello world</h1>
          </div>
        </Popup>
      </Marker>
    </Map>
  );
};

export default MapComponent;
