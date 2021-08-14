import { useEffect, useState } from 'react';

import Geolocation, { IGeolocation } from '../../utils/geolocation';

export default function UseGeolocation() {
  const [geolocation, setGeolocation] = useState<IGeolocation | undefined>();

  useEffect(() => {
    if (window && !geolocation) {
      const geolocation = new Geolocation;
      setGeolocation(geolocation);
    }
  }, [geolocation]);

  return geolocation;
}