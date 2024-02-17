"use client";

import { useEffect } from "react";
import { Spinner } from "@nextui-org/react";

export default function GetUserPage({ params }) {
  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API

      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        location.assign(
          process.env.NEXT_PUBLIC_APP_DOMAIN +
            params.lang +
            `/map/${latitude}/${longitude}`
        );
      });
    }
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spinner color="warning" size="lg" />
    </div>
  );
}
