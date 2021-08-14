import { useEffect, useState } from 'react';

import Geolocation, { IGeolocation } from '../../utils/geolocation';

export default function UseGeolocation(coordinates?: any) {
  console.log('coordinates', coordinates);
  const [geolocation, setGeolocation] = useState<IGeolocation | undefined>();
  console.log('geolocation', geolocation);

  useEffect(() => {
    if (window && !geolocation) {
      const geolocation = new Geolocation();
      setGeolocation(geolocation);
    }
  }, [geolocation]);

  return geolocation;
}