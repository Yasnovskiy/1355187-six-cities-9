import { useEffect, useRef } from 'react';
import { Icon, Marker } from 'leaflet';

import { Pins } from '../../const';
import { LocationOffer, Point } from '../../types/offers';
import useMap from '../../hooks/useMap';

const defaultCustomIcon = new Icon({
  iconUrl: `img/${Pins.Default}`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: `img/${Pins.Active}`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

type MapProps = {
  city: LocationOffer,
  points: Point[],
  selectedPoint: number | null,
  type: MapType,
}

type MapType = 'main' | 'room';

function getClassName(type: MapType): string {
  const mapping = {
    main: 'cities__map map',
    room: 'property__map map',
  };

  return mapping[type];
}

const useMapAdapter = (props: Omit<MapProps, 'type'>)=>{
  const { city, points, selectedPoint } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    const markers: Marker[] = [];
    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });
        marker
          .setIcon(
            selectedPoint !== undefined && point.id === selectedPoint
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
        markers.push(marker);
      });
    }
    return () => {

      markers.forEach((marker) => {
        if (map) {
          marker.removeFrom(map);
        }
      });
    };
  }, [map, points, selectedPoint]);

  return mapRef;
};
function Map({city, points, selectedPoint, type}: MapProps): JSX.Element {
  const mapRef = useMapAdapter({city, points, selectedPoint});

  return <section ref={mapRef} className={getClassName(type)}></section>;
}
export default Map;
