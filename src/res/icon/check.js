import * as React from "react";
const SVGComponent = (props) => (
  <svg
    width="1.5rem"
    height="1.5rem"
    viewBox="0 0 96 96"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title />
    <g>
      <path d="M58.3945,32.1563,42.9961,50.625l-5.3906-6.4629a5.995,5.995,0,1,0-9.211,7.6758l9.9961,12a5.9914,5.9914,0,0,0,9.211.0059l20.0039-24a5.9988,5.9988,0,1,0-9.211-7.6875Z" />
      <path d="M48,0A48,48,0,1,0,96,48,48.0512,48.0512,0,0,0,48,0Zm0,84A36,36,0,1,1,84,48,36.0393,36.0393,0,0,1,48,84Z" />
    </g>
  </svg>
);
export { SVGComponent as Correct }