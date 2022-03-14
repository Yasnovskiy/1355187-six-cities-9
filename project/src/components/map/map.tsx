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

function Map(props: MapProps): JSX.Element {
  const { city, points, selectedPoint , type} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);


  useEffect(() => {
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
      });
    }
  }, [map, points, selectedPoint]);

  return <section ref={mapRef} className={getClassName(type)}></section>;
}

export default Map;
