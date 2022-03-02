import { useEffect, useRef } from 'react';
import { Pins } from '../../const';
import { Icon, Marker } from 'leaflet';
import { LocationOffer, Points } from '../../types/offers';
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
  points: Points,
  selectedPoint: number | null,
}

function Map(props: MapProps): JSX.Element {
  const { city, points, selectedPoint } = props;

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


  return <section ref={mapRef} className="cities__map map"></section>;
}

export default Map;
