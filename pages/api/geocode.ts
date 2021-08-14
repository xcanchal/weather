import type { NextApiRequest, NextApiResponse } from 'next';
import Geocoder, { Coordinate } from '../../utils/geocoder';

import http from '../../utils/http-client';
type Data = {
  reverse: {
    lat: Coordinate
    lon: Coordinate
  }
}

const geocoder = new Geocoder(http);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    const { lat, lon } = req.query;
    const decoded = await geocoder.reverse(lat, lon);
    res.status(200).json(decoded)
  }
}
