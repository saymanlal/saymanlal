'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function LeafletMap({ 
  isDeveloper,
  location = "My Location",
  coordinates = [0, 0],
  zoom = 13
}: {
  isDeveloper: boolean;
  location?: string;
  coordinates?: [number, number];
  zoom?: number;
}) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined') return;

    const map = L.map(mapRef.current).setView(coordinates, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      className: isDeveloper ? 'grayscale-[50%] contrast-[1.1]' : ''
    }).addTo(map);

    // Custom marker with theme-appropriate color
    const markerIcon = L.icon({
      iconUrl: isDeveloper 
        ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png'
        : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });

    L.marker(coordinates, { icon: markerIcon })
      .addTo(map)
      .bindPopup(`<b>${location}</b>`)
      .openPopup();

    return () => {
      map.remove();
    };
  }, [isDeveloper, location, coordinates, zoom]);

  return <div ref={mapRef} className="h-96 w-full" />;
}