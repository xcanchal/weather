import type { NextComponentType } from 'next';
// import Image from 'next/image';

type Props = {
  fileName: string
  size?: string
};

const defaultProps = {
  size: null,
};

const host = 'http://openweathermap.org/img/wn';

const WeatherIcon: NextComponentType<Props> = ({ fileName, size }) => {
  let src = `${host}/${fileName}.png`;
  if (size) {
    src = src.replace('.png', `@${size}.png`)
  }
  return <img src={src} alt="Weather icon" />;
}

WeatherIcon.defaultProps = defaultProps;

export default WeatherIcon;
