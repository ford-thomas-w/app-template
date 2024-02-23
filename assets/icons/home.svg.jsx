import React from 'react';
import Svg, { Path } from 'react-native-svg';

const HomeIcon = ({ size = 24, color = 'rgb(245, 245, 245)', opacity = 1 }) => (
  <Svg
    aria-label="Home"
    height={size}
    width={size}
    viewBox="0 0 24 24"
    fill={color}
  >
    <Path
      d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"
      stroke={color}
      strokeLinejoin="round"
      strokeWidth="2"
      opacity={opacity}
    />
  </Svg>
);

export default HomeIcon;