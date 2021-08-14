// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import http from '../../utils/http-client';
import Weather, { Data } from '../../utils/weather';

const weather = new Weather(http);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    const summary = await weather.getSummary(req.query);
    res.status(200).json(summary)
  }
}
