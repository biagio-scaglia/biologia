import React from 'react';
import worldMap from '@/assets/images/map.svg';
import './Map.css';

export interface Marker {
  top: string;
  left: string;
  label?: string;
}

export interface MapProps {
  markers?: Marker[];
  className?: string;
}

export const Map: React.FC<MapProps> = ({ 
  markers = [
    { top: '22%', left: '20%', label: 'Nord America' },
    { top: '68%', left: '28%', label: 'Sud America' },
    { top: '38%', left: '72%', label: 'Asia' },
  ],
  className = ''
}) => {
  return (
    <div className={`map-wrapper ${className}`}>
      <img 
        src={worldMap} 
        alt="World Map" 
        className="map-image"
      />
      {markers.map((marker, i) => (
        <div
          key={i}
          className="map-marker"
          style={{
            position: 'absolute',
            top: marker.top,
            left: marker.left,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="map-marker-dot" />
          {marker.label && (
            <div className="map-marker-label">{marker.label}</div>
          )}
        </div>
      ))}
    </div>
  );
};

