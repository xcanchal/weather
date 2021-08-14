import { IHttpClient } from './http-client';

const apiKey = 'f3e5d29cab6f3a04d76a5598e463c4f7';
const apiBase = 'https://api.openweathermap.org/data/2.5';

export type Coordinate = any /* string | number */;

export enum Units {
  Standard = 'standard',
  Metric = 'metric',
  Imperial = 'imperial'
};

export type Data = {
  summary: {
    lat: number
    lon: number
    lang?: string
    units?: Units
    exclude?: string
  }
}

export interface IWeather {
  getSummary(data: Data['summary']): Promise<any>
}

export default class Weather implements IWeather {
  httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async getSummary(data: Data['summary']): Promise<any> {
    try {
      if (!data.lat || !data.lon) {
        throw new Error('"lat", "lon" coordinates are required');
      }
      let url = `${apiBase}/onecall?appid=${apiKey}&lat=${data.lat}&lon=${data.lon}&units=${Units.Metric}&lang=${data.lang}`;
      if (data.exclude) {
        url = `${url}&exclude=${data.exclude}`;
      }
      const summary = await this.httpClient.GET(url);
      return summary;
    } catch (err) {

    }
  }
}