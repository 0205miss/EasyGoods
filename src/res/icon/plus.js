import * as React from "react";
const SVGComponent = (props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    id="plus"
    data-name="Flat Line"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-line"
    {...props}
  >
    <path
      id="primary"
      d="M5,12H19M12,5V19"
      style={{
        fill: "none",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 4,
      }}
    />
  </svg>
);
export { SVGComponent as Plus };
