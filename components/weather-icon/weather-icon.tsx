import type { NextComponentType } from 'next';
// import Image from 'next/image';

type Props = {
  fileName: string
  size?: string
};

const defaultProps = {
  size: '2x',
};

const host = 'http://openweathermap.org/img/wn';

const WeatherIcon: NextComponentType<Props> = ({ fileName, size }) => (
  <img src={`${host}/${fileName}@${size}.png`} alt="Weather icon" />
);

WeatherIcon.defaultProps = defaultProps;

export default WeatherIcon;
