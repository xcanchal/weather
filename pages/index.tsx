import { useState, useCallback } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import Layout from '../components/layout';
import HtmlHead from '../components/html-head';
import http from '../utils/http-client';

const Summary: NextPage = () => {
  const [search, setSearch] = useState<string | undefined>();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [geocodeData, setGeocodeData] = useState<any>();
  const router = useRouter();

  const toggleForm = useCallback(() => {
    setShowForm(!showForm);
  }, [showForm]);

  const updateSearch = useCallback((event) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setSearch(event?.target.value);
        resolve('');
      }, 500);
    });
  }, []);

  const forwardGeocode = useCallback(async () => {
    const geocode = await http.GET(`/api/geocode?place=${search}`);
    const data = geocode.results.filter(
      ({ components }: any) => components._category === 'place' && (!!components.city || !!components.town)
    );
    console.log('fw geocode', geocode);
    console.log('data', data);
    setGeocodeData(data);
  }, [search]);

  const goToWeather = useCallback(({ lat, lng }: any) => {
    router.push({ pathname: '/weather', query: { lat, lon: lng } }, '/weather');
  }, [router]);

  console.log('search', search);

  return (
    <>
      <HtmlHead title="Weather - home" />
      <Layout>
        {showForm ? (
          <>
            <input type="text" placeholder="Place name" onChange={updateSearch} />
            <button onClick={forwardGeocode}>Search</button>
          </>
        ) : (
          <>
            <button onClick={toggleForm}>Search place</button>
            <button>Use my location</button>
          </>
        )}
        {geocodeData && (
          <ul className="results">
            {geocodeData.map(({ components, geometry }: any) => (
              <li key={`${geometry.lat}${geometry.lon}`} onClick={() => goToWeather(geometry)}>
                <span>{components.city ?? components.town ?? 'Unknown'}</span> -&nbsp;
                {!!components.county && <span>{components.county}, </span>}
                <span>{components.country}</span>
              </li>
            ))}
          </ul>
        )}
      </Layout>
    </>
  );
}

export default Summary;
