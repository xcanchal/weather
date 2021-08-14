import { IHttpClient } from '../utils/http-client';

const apiKey = 'c596216729b04984b3dea6ee1792daf4';
const baseUrl = 'https://api.opencagedata.com/geocode/v1/json';

export type Coordinate = any /* string | number */;

export interface IGeocoder {
  reverse(lat: Coordinate, lon: Coordinate): Promise<any>
}

export default class Geocoder implements IGeocoder {
  httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async reverse(lat: Coordinate, lon: Coordinate): Promise<any> {
    const url = `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(lat + ',' + lon)}&no_annotations=1`;
    const result = await this.httpClient.GET(url);
    return result;
  }

  /* forward() {

  } */
}