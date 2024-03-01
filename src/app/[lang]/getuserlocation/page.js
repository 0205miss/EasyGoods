"use client";

import { useEffect, useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
import Link from "next/link";

export default function GetUserPage({ params }) {
  const [location, setlocation] = useState(null);
  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setlocation({
            latitude,
            longitude,
          });
          if (
            window.location.ancestorOrigins[0] ==
              "https://sandbox.minepi.com" ||
            window.location.ancestorOrigins[0] ==
              "https://app-cdn.minepi.com" ||
            window.location.ancestorOrigins[0] ==
              "https://easygoods5604.pinet.com"
          ) {
            location.assign(
              "pi://testnet.easygoods.app/" +
                params.lang +
                `/map/${latitude}/${longitude}`
            );
          }
        },
        () => {
          alert(
            "EasyGoods suggest user to access the location permission for user experience"
          );
          setlocation({
            latitude: 0,
            longitude: 0,
          });
        }
      );
    }
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {location == null && <Spinner color="warning" size="lg" />}
      {location != null && (
        <Link
          href={`pi://testnet.easygoods.app/${params.lang}/map/${location.latitude}/${location.longitude}`}
        >
          <Button color="secondary">Go Back Pi Browser</Button>
        </Link>
      )}
    </div>
  );
}
