import {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import Layout from '../../components/layout';
import HtmlHead from '../../components/html-head';
import WeatherIcon from '../../components/weather-icon';
import useGeolocation from '../../hooks/use-geolocation/use-geolocation';
import http from '../../utils/http-client';
import Language from '../../utils/language';

const Weather: NextPage = () => {
  const router = useRouter();
  const [coords, setCoords] = useState<GeolocationPosition['coords'] | undefined>();
  const geolocation = useGeolocation();
  const [weather, setWeather] = useState<any>();
  const [geocodeData, setGeocodeData] = useState<any>();
  const [lang, setLang] = useState<any>();

  useEffect(() => {
    setLang(Language.determineLanguage());
  }, []);

  const getCoordinates = useCallback(async () => {
    let value: any;
    if (router.query && router.query.lat && router.query.lon) {
      value = { latitude: router.query.lat, longitude: router.query.lon };
    } else {
      const pos = await geolocation?.getCurrentPosition();
      value = pos?.coords;
    }
    console.log('coords value', value);
    setCoords(value);
  }, [geolocation, router.query]);

  useEffect(() => {
    if (geolocation && !coords) {
      getCoordinates();
    }
  });

  const getWeather = useCallback(async () => {
    const { latitude, longitude } = coords!;
    const weather = await http.GET(`/api/weather?lat=${latitude}&lon=${longitude}&lang=${lang}`);
    console.log('weather', weather);
    setWeather(weather);
  }, [coords, lang]);

  const reverseGeocode = useCallback(async () => {
    const { latitude, longitude } = coords!;
    const geocode = await http.GET(`/api/geocode?lat=${latitude}&lon=${longitude}`);
    const [data] = geocode.results;
    console.log('geocoded data', data);
    setGeocodeData(data);
  }, [coords]);

  useEffect(() => {
    if (weather && !geocodeData) {
      reverseGeocode();
    }
  }, [weather, geocodeData, reverseGeocode]);

  useEffect(() => {
    if (coords && !weather) {
      getWeather();
    }
  }, [coords, weather, getWeather]);

  const getSunTimes = useCallback((timestamp) => {
    if (!weather) {
      return '';
    }
    const date = new Date(timestamp * 1000);
    return `${date.getHours()}:${date.getMinutes()}`;
  }, [weather]);

  return (
    <>
      <HtmlHead title="Weather - summary" />
      <Layout>
        {geocodeData ? (
          <>
            <div className="location">
              <h1>{geocodeData?.components?.city ?? geocodeData?.components?.town ?? 'Unknown'}</h1>
              <p>
                {!!geocodeData?.components?.county && <span>{geocodeData?.components?.county}, </span>}
                <span>{geocodeData?.components?.country}</span>
              </p>
              <p>{new Date().toLocaleDateString(lang)}</p>
              {/* <h1>{geocodeData?.components?.town}, {geocodeData?.components?.country_code?.toUpperCase()}</h1> */}
            </div>
            {weather.current ? (
              <div className="current">
                <div className="weather" style={{ background: 'white', margin: '20px 0', borderRadius: '20px', padding: '32px 48px', boxSizing: 'border-box', display: 'flex', maxWidth: '500px' }}>
                  <WeatherIcon fileName={weather.current.weather[0].icon} size="2x" />
                  <div className="text">
                    <h2>{weather.current.temp}º {/* <small>(sensació: {weather.current.feels_like}º)</small> */}</h2>
                    <p>{weather.current.weather[0].description}</p>
                  </div>
                  <div className="sensors">
                    <ul>
                      <li>núvols: {weather.current.clouds}%</li>
                      <li>humitat: {weather.current.humidity}%</li>
                      <li>pressió: {weather.current.pressure}hPa</li>
                    </ul>
                  </div>
                </div>
                <div className="sensors">
                  <div className="sun">
                    <p>Sol</p>
                    <ul>
                      <li>sortida: {getSunTimes(weather.current.sunrise)}h</li>
                      <li>posta: {getSunTimes(weather.current.sunset)}h</li>
                    </ul>
                  </div>
                  <div className="wind">
                    <p>Vent</p>
                    <ul>
                      <li>graus: {weather.current.wind_deg}º</li>
                      <li>velocitat: {weather.current.wind_speed}m/s</li>
                    </ul>
                  </div>
                </div>
                <h2>Previsió setmanal</h2>
                <div className="forecast" style={{ display: 'flex' }}>
                  {weather.daily.map((day: any) => (
                    <div className="forecast-day" key={day.dt} style={{ background: 'white', margin: '0 10px', borderRadius: '10px', padding: '12px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <WeatherIcon fileName={day.weather[0].icon} />
                      <p>{new Date(day.dt * 1000).toLocaleDateString(lang)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : <p>Could not load weather</p>}
          </>
        ) : <p>Loading...</p>}
      </Layout>
    </>
  );
}

export default Weather;
