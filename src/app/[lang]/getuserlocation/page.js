"use client";

import { useEffect } from "react";
import { Spinner } from "@nextui-org/react";

export default function GetUserPage({ params }) {
  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API

      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        window.location.href =
          "https://easygoods5604.pinet.com/" +
          params.lang +
          `/map/${latitude}/${longitude}`;
      });
    }
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spinner color="warning" size="lg" />
    </div>
  );
}
