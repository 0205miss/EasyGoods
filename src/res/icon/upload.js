import * as React from "react";
const SVGComponent = (props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    id="upload"
    data-name="Flat Line"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-line"
    {...props}
  >
    <line
      id="primary"
      x1={12}
      y1={16}
      x2={12}
      y2={3}
      style={{
        fill: "none",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
    <polyline
      id="primary-2"
      data-name="primary"
      points="16 7 12 3 8 7"
      style={{
        fill: "none",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
    <path
      id="primary-3"
      data-name="primary"
      d="M20,16v4a1.08,1.08,0,0,1-1.14,1H5.14A1.08,1.08,0,0,1,4,20V16"
      style={{
        fill: "none",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
  </svg>
);
export { SVGComponent as Upload };
