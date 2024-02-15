import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width="1.5rem"
    height="1.5rem"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 64 64"
    {...props}
  >
    <path
      d="M-704-64H576v800H-704z"
      style={{
        fill: "none",
      }}
    />
    <path d="M32.085 56.058c6.165-.059 12.268-2.619 16.657-6.966 5.213-5.164 7.897-12.803 6.961-20.096-1.605-12.499-11.855-20.98-23.772-20.98-9.053 0-17.853 5.677-21.713 13.909-2.955 6.302-2.96 13.911 0 20.225 3.832 8.174 12.488 13.821 21.559 13.908h.308Zm-.282-4.003c-9.208-.089-17.799-7.227-19.508-16.378-1.204-6.452 1.07-13.433 5.805-18.015 5.53-5.35 14.22-7.143 21.445-4.11 6.466 2.714 11.304 9.014 12.196 15.955.764 5.949-1.366 12.184-5.551 16.48-3.672 3.767-8.82 6.016-14.131 6.068h-.256Zm-12.382-10.29 9.734-9.734-9.744-9.744 2.804-2.803 9.744 9.744L42.037 19.15l2.808 2.807-10.078 10.079 10.098 10.098-2.803 2.804-10.099-10.099-9.734 9.734-2.808-2.808Z" />
  </svg>
)
export { SvgComponent as Wrong }