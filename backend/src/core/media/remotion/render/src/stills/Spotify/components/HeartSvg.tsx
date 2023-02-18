import React, { SVGProps } from 'react';

const HeartSvg: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={34}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.343 3.402a8.218 8.218 0 0 0-1.734 2.66 8.38 8.38 0 0 0 0 6.277c.402.995.991 1.9 1.734 2.661L17 29l13.657-14A8.307 8.307 0 0 0 33 9.201a8.307 8.307 0 0 0-2.343-5.799A7.902 7.902 0 0 0 25 1a7.902 7.902 0 0 0-5.657 2.402L17 5.804l-2.343-2.402a7.99 7.99 0 0 0-2.595-1.778 7.83 7.83 0 0 0-6.123 0 7.99 7.99 0 0 0-2.596 1.778v0Z"
      fill="#57B65F"
      stroke="#57B65F"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default HeartSvg;
