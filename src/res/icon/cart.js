import * as React from "react";
const SVGComponent = (props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 96 96"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <defs>
      <clipPath id="clip-cart">
        <rect width={96} height={96} />
      </clipPath>
    </defs>
    <g id="cart" clipPath="url(#clip-cart)">
      <g id="pills" transform="translate(0 -116)">
        <g id="Group_154" data-name="Group 154">
          <path
            id="Path_188"
            data-name="Path 188"
            d="M92,132H84.619a8.361,8.361,0,0,0-7.956,5.47L63.712,174.53A8.364,8.364,0,0,1,55.755,180H21.321a8.4,8.4,0,0,1-7.773-4.994l-8.925-21C2.387,148.746,6.445,143,12.4,143H57"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={8}
          />
          <circle
            id="Ellipse_335"
            data-name="Ellipse 335"
            cx={4.5}
            cy={4.5}
            r={4.5}
            transform="translate(20 187)"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={8}
          />
          <circle
            id="Ellipse_336"
            data-name="Ellipse 336"
            cx={4.5}
            cy={4.5}
            r={4.5}
            transform="translate(49 187)"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={8}
          />
        </g>
      </g>
    </g>
  </svg>
);
export { SVGComponent as Cart };
