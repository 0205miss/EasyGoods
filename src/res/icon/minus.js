import * as React from "react";
const SVGComponent = (props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    id="minus"
    data-name="Line Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon line-color"
    {...props}
  >
    <line
      id="primary"
      x1={19}
      y1={12}
      x2={5}
      y2={12}
      style={{
        fill: "none",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 4,
      }}
    />
  </svg>
);
export { SVGComponent as Minus };
