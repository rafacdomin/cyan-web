import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

interface MarkerProp {
  id: string;
  geography: {
    coordinates: Array<number>;
  };
}

interface MapProps {
  markers: Array<MarkerProp>;
}

const myIcon = L.icon({
  iconUrl: '/farm.svg',
  iconSize: [35, 50],
  iconAnchor: [12.5, 50],
  popupAnchor: [0, -50],
});

const MapComponent: React.FC<MapProps> = ({ markers }) => {
  return (
    <Map center={[-22.7150256, -43.3777264]} zoom={3}>
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
            <div>
              <h1>Hello world</h1>
            </div>
          </Popup>
        </Marker>
      ))}
    </Map>
  );
};

export default MapComponent;
