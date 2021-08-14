import { promisify } from 'util';

export interface IGeolocation {
  getCurrentPosition(): Promise<GeolocationPosition>
}

export default class Geolocation implements IGeolocation {
  constructor() {
    if (!navigator.geolocation) {
      throw new Error('geolocation is not available in this browser');
    }
  }

  async getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      try {
        navigator.geolocation?.getCurrentPosition((position) => {
          resolve(position);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}